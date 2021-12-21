import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'handleRows'
})
export class HandleRowsPipe implements PipeTransform {

  transform<T>(value: T[], rowNum: number): T[][] {
    let rows: T[][] = [];
    for(let i=0; i<value.length; i+=rowNum){
      rows.push(value.slice(i, i + rowNum))
    }
    return rows;
  }

}
