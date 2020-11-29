window.addEventListener("load", () => {
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);


    const getIDs = (stanje) => {
        let IDs = [];
        $("#" + stanje + " .rezervacija-skatla").get().forEach((skatla) => {
            IDs.push(skatla.getAttribute("id"));
        })
        return IDs;
    }

    const addEventListeners = (stanje, sprejmiHandler, zavrniHandler, socket) => {
        const IDs = getIDs(stanje);
        let buttons = $("#" + stanje + " .ikone-stil").get();
        console.log(buttons);
        buttons.forEach((button, index) => {
            const potrdi = button.getElementsByClassName("fa-check-circle")[0];
            const zavrni = button.getElementsByClassName("fa-ban")[0];
            if (potrdi && sprejmiHandler) {
                potrdi.addEventListener("click", (event) => {
                    console.log("Event handler positice added");
                    sprejmiHandler(IDs[index], socket);
                });
            }
            if (zavrni && zavrniHandler) {
                zavrni.addEventListener("click", (event) => {
                    zavrniHandler(IDs[index], socket);
                    console.log("Event handler negative added")
                });
            }
        })

    }


    const narocilaZavrniHandler = (id, socket) => {
        axios.delete("/api/narocila/" + id)
            .then((response) => {
                socket.emit("narociloKuhar", JSON.stringify({
                    "izbrisano":true
                }))
                window.location.reload();
            })
            .catch((err) => {
                console.log("Narocila ni bilo moc izbrisari")
            })
    }

    const pripravaSprejmiHanlder = (id) => {
        axios.put("/api/narocila", {"stanje": "postrezeno", "id" : id})
            .then((response) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                alert("Narocila ni bilo moc posodobiti");
            });
    }

    const postrezbaSprjemiHandler = (id) => {
        axios.put("/api/narocila", {"stanje": "placano", "id" : id})
            .then((response) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                alert("Narocila ni bilo moc posodobiti");
            });
    }

    const postrezbaZavrniHandler = (id) => {
        axios.put("/api/narocila", {"stanje": "pripravljeno", "id" : id})
            .then((response) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                alert("Narocila ni bilo moc posodobiti");
            });
    }

    const updatePrice = (inputs) => {
        let novaCena = 0;
        inputs.forEach((jed) => {
            novaCena += parseInt(jed.getAttribute("cena")) * parseInt(jed.value);
        })
        document.getElementById("cenaNarocila").innerHTML= novaCena + " $";
    }


    const inputs = $('.number-input .quantity').get();
    const jediIDs = [];
    inputs.forEach((jed) => {
        const id = jed.getAttribute("id");
        jediIDs.push(id);
        jed.addEventListener('change', (event) => {
            updatePrice(inputs);
            console.log("Change on " + id + " novo stanje:"  + event.target.value + "cena: " + jed.getAttribute("cena")   );
        })
    })

    const credentials = JSON.parse(sessionStorage.getItem("credentials"));
    const ustvariNaorciloButton = document.getElementById("saveData");
    const socket = io ();
    socket.on("narociloNatakar-" + credentials.uporabnik_id, (msg) => {
        setTimeout(location.reload.bind(location), 4000);
        var audio = new Audio('/sounds/notification.mp3');
        audio.play();
        swal("Obvestilo", msg, "success", {
        });
    })

    ustvariNaorciloButton.addEventListener("click", (event) => {
        let narociloOBJ = {
            id:JSON.parse(sessionStorage.getItem("credentials")).uporabnik_id,
            meni_items: [],
            cena: 0,
            miza: document.getElementById("stevilkaMize").value,
            stanje: "sprejeto"
        }
        let cena = 0;
        inputs.forEach((jed) => {
            const id = jed.getAttribute("id");
            const kolicina = parseInt(jed.value);
            if (kolicina !== 0) {

                const obj = {
                    meniItemID: id,
                    kolicina: kolicina
                }
                cena += parseInt(jed.getAttribute("cena")) * parseInt(jed.value);
                narociloOBJ.meni_items.push(obj);
            }
        })
        narociloOBJ.cena = cena;
        axios.post("/api/narocila", narociloOBJ)
            .then((response) => {
                socket.emit("narociloKuhar", JSON.stringify({
                    "ustvarjeno":true
                }))
                window.location.reload();
            })
            .catch((err)=> {
                alert("Naroicla ni bilo moc ustvariti");
                console.log(err);
            })
    })
    addEventListeners("narocila", undefined, narocilaZavrniHandler, socket);
    addEventListeners("pripravljeneJedi", pripravaSprejmiHanlder, undefined, socket);
    addEventListeners("postrezeneJedi", postrezbaSprjemiHandler, postrezbaZavrniHandler, socket);


})
