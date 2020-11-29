window.addEventListener("load", () => {
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);

    const getIDs = (stanje, atribut) => {
        let IDs = [];
        $("#" + stanje + " .rezervacija-skatla").get().forEach((skatla) => {
            IDs.push(skatla.getAttribute(atribut));
        })
        return IDs;
    }

    const addEventListeners = (stanje, sprejmiHandler, zavrniHandler, socket) => {
        const IDs = getIDs(stanje, "id");
        const natakarIDs = getIDs(stanje, "idnatakar");
        let buttons = $("#" + stanje + " .ikone-stil").get();
        buttons.forEach((button, index) => {
            const potrdi = button.getElementsByClassName("fa-check-circle")[0];
            const zavrni = button.getElementsByClassName("fa-ban")[0];
            potrdi.addEventListener("click", (event) => {
                sprejmiHandler(IDs[index], natakarIDs[index], socket);
            });
            zavrni.addEventListener("click", (event) => {
                zavrniHandler(IDs[index], natakarIDs[index], socket);
            });
        })

    }

    const narocilaSprejmiHandler = (id, natakarid, socket) => {

        axios.put("/api/narocila", {"stanje": "v pripravi", "id" : id})
            .then((response) => {
                socket.emit("narociloNatakar", JSON.stringify({
                    "id": id,
                    "staroStanje":"sprejeto",
                    "novoStanje": "v pripravi",
                    "id_uporabnika": natakarid
                }))
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                alert("Narocila ni bilo moc posodobiti");
            });
    }

    const narocilaZavrniHandler = (id, socket) => {
        window.location.reload();
        console.log("Click!");
    }

    const pripravaSprejmiHanlder = (id, natakarid, socket) => {
        axios.put("/api/narocila", {"stanje": "pripravljeno", "id" : id})
            .then((response) => {
                window.location.reload();
                socket.emit("narociloNatakar", JSON.stringify({
                    "id": id,
                    "staroStanje": "v pripravi",
                    "novoStanje": "pripravljeno",
                    "id_uporabnika": natakarid
                }))
            })
            .catch((err) => {
                console.log(err);
                alert("Narocila ni bilo moc posodobiti");
            });
    }

    const pripravaZavrniHanlder = (id,natakarid, socket) => {
        axios.put("/api/narocila", {"stanje": "sprejeto", "id" : id})
            .then((response) => {
                socket.emit("narociloNatakar", JSON.stringify({
                    "id": id,
                    "staroStanje": "v pripravi",
                    "novoStanje": "sprejeto",
                    "id_uporabnika": natakarid
                }))
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                alert("Narocila ni bilo moc posodobiti");
            });
    }

    const socket = io ();

    socket.on("narociloKuhar", (message) => {
        setTimeout(location.reload.bind(location), 4000);
        var audio = new Audio('/sounds/notification.mp3');
        audio.play();
        setTimeout(()=> {
            swal("Obvestilo", "Narocila so bila posodobljena", "success", {
            });
        },1000)
    })

    addEventListeners("narocila", narocilaSprejmiHandler, narocilaZavrniHandler, socket);
    addEventListeners("priprava", pripravaSprejmiHanlder, pripravaZavrniHanlder, socket);


})
