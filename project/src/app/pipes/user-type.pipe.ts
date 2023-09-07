import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userType'
})
export class UserTypePipe implements PipeTransform {

  transform(value: number,): string {
    switch (value){
      case 1:
        return 'User'
      case 2:
        return 'Moderator'
      case 3:
        return 'Administrator'
      default:
        return 'Not assigned'
    }
  }

}
