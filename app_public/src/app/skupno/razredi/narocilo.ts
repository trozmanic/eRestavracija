export class Narocilo{
    _id: String;
    datum_in_ura: Date;
    stanje: String;
    miza: number;
    cena: number;
    natakar: any;
    meni_items: [{
        _id: String;
        meni_item: String;
        kolicina: number;
        cena: number;
        ime: String;
    }]
}
