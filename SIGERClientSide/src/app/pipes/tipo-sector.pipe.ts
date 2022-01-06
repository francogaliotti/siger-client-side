import { Pipe, PipeTransform } from '@angular/core';
import { TipoSector } from '../models/tipo-sector';

@Pipe({
  name: 'tipoSectorPipe'
})
export class TipoSectorPipe implements PipeTransform {

  transform(tipos_sector: TipoSector[], page: number=0, search: string =''): TipoSector[] {
    
    if(search.length === 0)
      return tipos_sector.slice(page, page +10);

  const filtered_Tipos_Sector = tipos_sector.filter(resp => resp.nombreTipoSector.includes( search ));

  return filtered_Tipos_Sector.slice(page, page +10);
  }

}