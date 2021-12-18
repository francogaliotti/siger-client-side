import { Pipe, PipeTransform } from '@angular/core';
import { TipoLicenciaDTO } from 'src/app/dto/tipoLicenciaDTO';

@Pipe({
  name: 'tipoLicenciaPipe'
})
export class TipoLicenciaPipe implements PipeTransform {

  transform(tipo_licencias: TipoLicenciaDTO[], page: number=0, search: string =''): TipoLicenciaDTO[] {
    
    if(search.length === 0)
    return tipo_licencias.slice(page, page +10);
    
    const filtered_Estado_Boletas = tipo_licencias.filter(resp => resp.denominacion.includes( search ));
    
    return filtered_Estado_Boletas.slice(page, page +10);
  }

}