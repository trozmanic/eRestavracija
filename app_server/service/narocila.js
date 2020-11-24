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

module.exports = {
    prepKuhar
}
