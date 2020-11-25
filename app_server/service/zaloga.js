const seznamSestavin = (podatki) => {
    let odgovor = {
        ime: "",
        kolicina: 0,
        enota: "",
        cena: 0
    }
    for (let index =0; index < podatki.length ; index ++) {
        const podatek = podatki[index];
        odgovor.ime = podatek.ime;
        odgovor.kolicina = podatek.kolicina;
        odgovor.enota = podatek.enota;
        odgovor.cena = podatek.cena;
        
    }
    return odgovor;
}

module.exports = {
    seznamSestavin
}