import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sector'
})
export class SectorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
