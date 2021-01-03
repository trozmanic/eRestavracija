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
    }];
}

export class Natakar {
  _id: string;
  id_uporabnika: string;
}

export class NarociloZaposleni extends Narocilo{
  miza: number;
  natakar: Natakar;
  constructor() {
    super();
  }
}

export class NarocilaKuhar {
  vrsta: NarociloZaposleni [];
  priprava: NarociloZaposleni[];
}

export class NarocilaNatakar {
  vrsta: NarociloZaposleni [];
  priprava: NarociloZaposleni[];
  postrezena: NarociloZaposleni[];
}

export class NarociloUpdetable {
  _id: string;
  stanje: string;
}

export class NarociloCreatable{
  id: string;
  meni_items: [
    {
      'meniItemID': string;
      'kolicina': number;
    }
  ];
  cena: number;
  miza: number;
  stanje: string;
}

export class NarociloSocket {
  from: string;
  to: string;
  narocilo: NarociloZaposleni;
}
