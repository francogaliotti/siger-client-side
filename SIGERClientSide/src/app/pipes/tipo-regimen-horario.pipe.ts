import { Pipe, PipeTransform } from '@angular/core';
import { TipoRegimenHorario } from '../models/tipo-regimen-horario';

@Pipe({
  name: 'tipoRegimenHorarioPipe'
})
export class TipoRegimenHorarioPipe implements PipeTransform {

  transform(tipos_Regimen_Horario: TipoRegimenHorario[], page: number=0, search: string =''): TipoRegimenHorario[] {

    if(search.length === 0)
      return tipos_Regimen_Horario.slice(page, page +10);

    const filtered_Tipos_Regimen_Horario = tipos_Regimen_Horario.filter(resp => resp.denominacionTipoRegimenHorario.includes( search ));

    return filtered_Tipos_Regimen_Horario.slice(page, page +10);
  }

}
