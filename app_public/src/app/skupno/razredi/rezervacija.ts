import { Narocilo } from './narocilo'

export class Rezervacija {
    _id: String;
    datum: Date;
    id_stranke: String;
    ime_stranke: String;
    st_oseb: Number;
    stanje: String;
    narocilo: Narocilo;
}