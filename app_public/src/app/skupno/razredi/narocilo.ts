export class Narocilo{
    _id: String;
    datum_in_ura: Date;
    stanje: String;
    cena: Number;
    meni_items: [{
        _id: String;
        meni_item: String;
        kolicina: Number;
        cena: Number;
        ime: String;
    }]
}
