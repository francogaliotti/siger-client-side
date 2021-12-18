import { Pipe, PipeTransform } from '@angular/core';
import { TipoBoletaDTO } from 'src/app/dto/tipo-boleta-dto';

@Pipe({
  name: 'tipoBoletaPipe'
})
export class TipoBoletaPipe implements PipeTransform {

  transform(tipo_boletas: TipoBoletaDTO[], page: number=0, search: string =''): TipoBoletaDTO[] {
    
    if(search.length === 0)
      return tipo_boletas.slice(page, page +10);
    
    const filtered_Estado_Boletas = tipo_boletas.filter(resp => resp.tipoBoletaDenominacion.includes( search ));
    
    return filtered_Estado_Boletas.slice(page, page +10);
  }

}