import { Pipe, PipeTransform } from '@angular/core';
import { EstadoBoleta } from 'src/app/models/estado-boleta';

@Pipe({
  name: 'estadoBoletaPipe'
})
export class EstadoBoletaPipe implements PipeTransform {

  transform(estado_boletas: EstadoBoleta[], page: number=0, search: string =''): EstadoBoleta[] {

    if(search.length === 0)
      return estado_boletas.slice(page, page +10);

    const filtered_Estado_Boletas = estado_boletas.filter(resp => resp.nombreEstadoBoleta.includes( search ));

    return filtered_Estado_Boletas.slice(page, page +10);
  }

}
