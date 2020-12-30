import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rezervacijaPotrditevMeni'
})
export class RezervacijaPotrditevMeniPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
