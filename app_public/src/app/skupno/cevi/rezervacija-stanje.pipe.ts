import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rezervacijaStanje'
})
export class RezervacijaStanjePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    const stanja={caka:"Čaka na potrditev",potrjena:"Potrjena",zavrnjena:"Zavrnjena",preklicana:"Preklicana",pretekla:"Pretekla"};
    return stanja[value];
  }

}
