import { Pipe, PipeTransform } from '@angular/core';
import { RegimenHorario } from '../models/regimen-horario';

@Pipe({
  name: 'regimenHorarioPipe'
})
export class RegimenHorarioPipe implements PipeTransform {

  transform(regimenes_horarios: RegimenHorario[], page: number=0, search: string =''): RegimenHorario[] {

    //if(search.length === 0)
      return regimenes_horarios.slice(page, page +10);

    /*const filtered_Regimenes_horarios = regimenes_horarios.filter(resp => resp.fechaInicioVigenciaRegimenHorario.includes( search ));

    return filtered_Regimenes_horarios.slice(page, page +10);*/
  }
  //Averiguar como filtrar entre fechas

}
