import { Pipe, PipeTransform } from '@angular/core';
import { Viatico } from 'src/app/models/viatico';

@Pipe({
  name: 'viaticoPipe'
})
export class ViaticoPipe implements PipeTransform {

  transform(viaticos: Viatico[], page: number=0, search: string =''): Viatico[] {
    
    if(search.length === 0)
      return viaticos.slice(page, page +10);
      
    const filtered_Estado_Boletas = viaticos.filter(resp => resp.denominacionViatico.includes( search ));
    
    return filtered_Estado_Boletas.slice(page, page +10);
  }

}