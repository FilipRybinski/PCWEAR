import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userCircle'
})
export class UserCirclePipe implements PipeTransform {

  transform(value?: string, ): string {
    if(value) return value.slice(0,2).toUpperCase();
    return 'NN';
  }

}
