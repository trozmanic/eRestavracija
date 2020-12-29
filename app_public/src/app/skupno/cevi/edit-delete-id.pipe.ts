import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edit_id'
})
export class EditIdPipe implements PipeTransform {

  transform(id: string): string {
    return "edit_" + id;
  }

}

@Pipe({
  name: 'delete_id'
})
export class DeleteIdPipe implements PipeTransform {

  transform(id: string): string {
    return "del_" + id;
  }

}
