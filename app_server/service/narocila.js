const prepKuhar = (narocila) => {
    let retObj = {
        vrsta: [],
        priprava: []
    }
    for (let index =0; index < narocila.length ; index ++) {
        const narocilo = narocila[index];
        const datum = new Date(narocilo.datum_in_ura);
        narocilo.datum =  datum.getUTCDate() + "." + datum.getUTCMonth() + "." + datum.getUTCFullYear();
        narocilo.ura = datum.getUTCHours() + ":" + datum.getUTCMinutes();
        if (narocilo.stanje === "sprejeto") {
            retObj.vrsta.push(narocilo);
        }
        else if (narocilo.stanje === "v pripravi") {
            retObj.priprava.push(narocilo);
        }
    }
    return retObj;
}

const prepNatakar = (narocila, idUporabnika) => {
    let retObj = {
        vrsta:[],
        priprava:[],
        postrezena:[]
    }

    for (let index = 0; index < narocila.length ; index ++) {
        let narocilo = narocila[index];
        const datum = new Date(narocilo.datum_in_ura);
        narocilo.datum =  datum.getUTCDate() + "." + datum.getUTCMonth() + "." + datum.getUTCFullYear();
        narocilo.ura = datum.getUTCHours() + ":" + datum.getUTCMinutes();

        if (idUporabnika && narocilo.natakar) {
            console.log(idUporabnika)
            console.log(narocilo.natakar.id_uporabnika);
            //To narocilo ni od tega uporbnika ...
            if (idUporabnika !== narocilo.natakar.id_uporabnika) {
                continue;
            }
        }


        if (narocilo.stanje === "sprejeto") {
            retObj.vrsta.push(narocilo);
        }
        if (narocilo.stanje === "pripravljeno") {
            retObj.priprava.push(narocilo);
        }
        if (narocilo.stanje === "postrezeno") {
            retObj.postrezena.push(narocilo);
        }
    }
    return retObj;
}

module.exports = {
    prepKuhar,
    prepNatakar
}
