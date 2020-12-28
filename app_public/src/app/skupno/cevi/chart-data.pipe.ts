import { Pipe, PipeTransform } from '@angular/core';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { ZasluzekRazred } from "../razredi/zasluzek-razred";

@Pipe({
  name: 'chartData'
})
export class ChartDataPipe implements PipeTransform {

  transform(z: ZasluzekRazred): ChartDataSets[] {
    let lineChartData: ChartDataSets[] = [
      { data: z.zasluzek_dnevi, label: 'dnevi v mesecu' },
    ];
    return lineChartData;
  }

}
