import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mesecToString'
})
export class MesecToStringPipe implements PipeTransform {

  transform(mesec: number): string {
    var mesec_string;
    switch(mesec) {
      case 0:
        mesec_string = "Januar";
        break;
      case 1:
        mesec_string = "Februar";
        break;
      case 2:
        mesec_string = "Marec";
        break;
      case 3:
        mesec_string = "April ";
        break;
      case 4:
        mesec_string = "Maj";
        break;
      case 5:
        mesec_string = "Junij";
        break;
      case 6:
        mesec_string = "Julij";
        break;
      case 7:
        mesec_string = "Avgust";
        break;
      case 8:
        mesec_string = "September";
        break;
      case 9:
        mesec_string = "Oktober";
        break;
      case 10:
        mesec_string = "November";
        break;
      case 11:
        mesec_string = "December ";
        break;
      default:
        mesec_string = "Napaka helper mesec to string";
    }
    return mesec_string;
  }

}
