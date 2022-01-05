import { Pipe, PipeTransform } from '@angular/core';
import { Sector } from '../models/sector';

@Pipe({
  name: 'sector'
})
export class SectorPipe implements PipeTransform {

  transform(sectores: Sector[], page: number=0, search: string =''): Sector[] {

    if(search.length === 0)
      return sectores.slice(page, page +10);

    const filtered_Sectores = sectores.filter(resp => resp.denominacion.includes( search ));

    return filtered_Sectores.slice(page, page +10);
  }

}
