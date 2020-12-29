import { Narocilo } from "./narocilo";

export class ZasluzekRazred {
  ostevilceni_dnevi: number[];
  zasluzek_dnevi: number[];
  dnevi: String[];
  skupno_prilivi: number;
  mesec: number;
  leto: number;
  zac_dan: String;
  st_dni: number;
  zaposleni_strosek:number;
  tabele_placanil:Narocilo[];
  tabele_ne_placanil:Narocilo[];
  sporocilo: String;
}
