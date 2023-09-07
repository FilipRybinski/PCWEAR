import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'artilce'
})
export class ArtilcePipe implements PipeTransform {

  transform(value: string): string {
    return value[0].toLocaleUpperCase() + value.slice(1).toLocaleLowerCase();
  }

}
