import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dots'
})
export class DotsPipe implements PipeTransform {

  transform(value: string): string {
    let length:number=5;
    return value.length>length ? `${value.substring(0,length)}...` : value;
  }

}
