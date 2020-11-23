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
        buttons.forEach((button, index) => {
            const potrdi = button.getElementsByClassName("fa-check-circle")[0];
            const zavrni = button.getElementsByClassName("fa-ban")[0];
            potrdi.addEventListener("click", (event) => {
                sprejmiHandler(IDs[index], socket);
            });
            zavrni.addEventListener("click", (event) => {
                zavrniHandler(IDs[index], socket);
            });
        })

    }

    const narocilaSprejmiHandler = (id, socket) => {

        axios.put("/api/narocila", {"stanje": "v pripravi", "id" : id})
            .then((response) => {
                socket.emit("narociloNatakar", JSON.stringify({
                    "id": id,
                    "novoStanje": "v pripravi"
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

    const pripravaSprejmiHanlder = (id, socket) => {
        axios.put("/api/narocila", {"stanje": "pripravljeno", "id" : id})
            .then((response) => {
                window.location.reload();
                socket.emit("narociloNatakar", JSON.stringify({
                    "id": id,
                    "novoStanje": "pripravljeno"
                }))
            })
            .catch((err) => {
                console.log(err);
                alert("Narocila ni bilo moc posodobiti");
            });
    }

    const pripravaZavrniHanlder = (id, socket) => {
        axios.put("/api/narocila", {"stanje": "sprejeto", "id" : id})
            .then((response) => {
                socket.emit("narociloNatakar", JSON.stringify({
                    "id": id,
                    "novoStanje": "v pripravi"
                }))
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                alert("Narocila ni bilo moc posodobiti");
            });
    }

    const socket = io ();

    addEventListeners("narocila", narocilaSprejmiHandler, narocilaZavrniHandler, socket);
    addEventListeners("priprava", pripravaSprejmiHanlder, pripravaZavrniHanlder, socket);


})
