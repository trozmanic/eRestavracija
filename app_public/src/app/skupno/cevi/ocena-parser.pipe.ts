import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ocenaParser'
})
export class OcenaParserPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
