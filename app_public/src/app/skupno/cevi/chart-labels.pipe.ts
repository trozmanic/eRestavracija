import { Pipe, PipeTransform } from '@angular/core';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { ZasluzekRazred } from "../razredi/zasluzek-razred";

@Pipe({
  name: 'chartLabels'
})
export class ChartLabelsPipe implements PipeTransform {

  transform(z: ZasluzekRazred): Label[] {
    let arr: Label[] = new Array(z.ostevilceni_dnevi.length);
    let i;
    for(i = 0;i < z.ostevilceni_dnevi.length;i++) {
      arr[i] = z.ostevilceni_dnevi[i].toString();
    }
    return arr;
  }

}
