import { Pipe, PipeTransform } from '@angular/core';

import { ZasluzekRazred } from "../razredi/zasluzek-razred";

@Pipe({
  name: 'datumToStingZasluzek'
})
export class DatumToStingZasluzekPipe implements PipeTransform {

  transform(datum: ZasluzekRazred, index: number): String {

    var dan = datum.dnevi;
    var zac_dan = datum.zac_dan;
    var st_dni = datum.st_dni;

    if(!dan) {
      return "";
    } else {
      var i = index;
      var prviDan = 0;
      zac_dan.localeCompare("pon") == 0 ? prviDan=0 : prviDan=prviDan;
      zac_dan.localeCompare("tor") == 0 ? prviDan=1 : prviDan=prviDan;
      zac_dan.localeCompare("sre") == 0 ? prviDan=2 : prviDan=prviDan;
      zac_dan.localeCompare("cet") == 0 ? prviDan=3 : prviDan=prviDan;
      zac_dan.localeCompare("pet") == 0 ? prviDan=4 : prviDan=prviDan;
      zac_dan.localeCompare("sob") == 0 ? prviDan=5 : prviDan=prviDan;
      zac_dan.localeCompare("ned") == 0 ? prviDan=6 : prviDan=prviDan;
      if (i - prviDan >= 0 && i - prviDan < st_dni) {
        //dodamo stevec
        return (i - prviDan + 1) + " " + dan[index];
      }
    }
    if (dan[index] == null) {
      return "";
    }
    return dan[index];
  }

}
