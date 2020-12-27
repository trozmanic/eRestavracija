import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stevec'
})
export class StevecPipe implements PipeTransform {

  transform(indeks: number): number {
    return indeks + 1;
  }

}
