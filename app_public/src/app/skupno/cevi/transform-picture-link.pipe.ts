import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformPictureLink'
})
export class TransformPictureLinkPipe implements PipeTransform {

  transform(url: string, ...args: unknown[]): unknown {
    const arr = url.split('/');
    return '/assets/slike/jedi/' + arr[arr.length - 1];
  }

}
