export class MeniItem {
    _id: String;
    ime: String;
    opis: String;
    ocena: Number;
    ocena_count: Number;
    kalorije: Number;
    slika: String;
    cena: Number;
    sestavine:[{
        _id: String;
        kolicina: Number;
    }]
}

export class MeniItemRezervacija extends MeniItem {
    kolicina: number;
    constructor(x:any){
        super();
        Object.assign(this,x);
    }
}