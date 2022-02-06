import { Pipe, PipeTransform } from '@angular/core';
import { Empleado } from '../models/empleado';

@Pipe({
  name: 'empleadoPipe'
})
export class EmpleadoPipe implements PipeTransform {

  transform(empleados: Empleado[], page: number=0, search: string =''): Empleado[] {
        
    if(search.length === 0)
      return empleados.slice(page, page +10);
    
    const filtered_Empleados = empleados.filter(resp => resp.apellido.includes( search ));
    
    return filtered_Empleados.slice(page, page +10);
  }

}
