export class MeniItem {
    _id: String;
    ime: String;
    opis: String;
    ocena: Number;
    ocena_count: Number;
    kalorije: Number;
    slika: String;
    cena: Number;
    sestavine: [{
        _id: String;
        kolicina: Number;
    }];
}

export class MeniItemPOST{
  ime: String;
  opis: String;
  kalorije: Number;
  cena: Number;
  sestavine: string[];
  slika: string;
}

export class MeniItemPUT{
  id: String;
  ime: String;
  opis: String;
  kalorije: Number;
  cena: Number;
  slika: String;
}


export class MeniItemGost extends MeniItem {
  ocenjena: boolean;
  constructor(ocenjena: boolean) {
    super();
    this.ocenjena = ocenjena;
  }
}

export class MeniItemRezervacija extends MeniItem {
    kolicina: number;
    constructor(x: any){
        super();
        Object.assign(this, x);
    }
}

export class Sestavina {
  ime: string;
  kolicina: number;
  kcal: number;
  constructor(ime: string, kolicina: number, kcal: number) {
    this.ime = ime;
    this.kolicina = kolicina;
    this.kcal = kcal
  }
}

export class APIResponse {
  parsed: [{
    food: {
      nutrients: {
        ENERC_KCAL: number
      }
    }
  }]
}

export class ImgRes {
  image: string
}

