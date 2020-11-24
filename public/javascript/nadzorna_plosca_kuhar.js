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

    const addEventListeners = (stanje, sprejmiHandler, zavrniHandler) => {
        const IDs = getIDs(stanje);
        let buttons = $("#" + stanje + " .ikone-stil").get();
        buttons.forEach((button, index) => {
            const potrdi = button.getElementsByClassName("fa-check-circle")[0];
            const zavrni = button.getElementsByClassName("fa-ban")[0];
            potrdi.addEventListener("click", (event) => {
                sprejmiHandler(IDs[index]);
            });
            zavrni.addEventListener("click", (event) => {
                zavrniHandler(IDs[index]);
            });
        })

    }

    const narocilaSprejmiHandler = (id) => {
        axios.put("/api/narocila", {"stanje": "v pripravi", "id" : id})
            .then((response) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                alert("Narocila ni bilo moc posodobiti");
            });
    }

    const narocilaZavrniHandler = (id) => {
        window.location.reload();
        console.log("Click!");
    }

    const pripravaSprejmiHanlder = (id) => {
        axios.put("/api/narocila", {"stanje": "pripravljeno", "id" : id})
            .then((response) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                alert("Narocila ni bilo moc posodobiti");
            });
    }

    const pripravaZavrniHanlder = (id) => {
        axios.put("/api/narocila", {"stanje": "sprejeto", "id" : id})
            .then((response) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                alert("Narocila ni bilo moc posodobiti");
            });
    }

    addEventListeners("narocila", narocilaSprejmiHandler, narocilaZavrniHandler);
    addEventListeners("priprava", pripravaSprejmiHanlder, pripravaZavrniHanlder);

})
