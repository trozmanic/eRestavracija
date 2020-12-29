import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'odstej'
})
export class OdstejPipe implements PipeTransform {

  transform(prvi: number, drugi: number): unknown {
    if (prvi && drugi) {
      return prvi - drugi;
    }
    return 0;
  }

}
