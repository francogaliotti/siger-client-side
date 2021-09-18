import { Component, OnInit } from '@angular/core';
import { Permiso } from 'src/app/models/permiso';
import { PermisoService } from 'src/app/services/permiso.service';

@Component({
  selector: 'app-lista-permiso',
  templateUrl: './lista-permiso.component.html',
  styleUrls: ['./lista-permiso.component.css']
})
export class ListaPermisoComponent implements OnInit {

  permisos: Permiso[]=[];

  constructor(private permisoService: PermisoService) { }

  ngOnInit(): void {
    this.cargarPermisos();
  }
  cargarPermisos():void{
    this.permisoService.list().subscribe(
      data=>{
        this.permisos=data
      }, err=>{
        console.log(err);
      }
    )
  }
  borrarPermiso(id?:number):void{
    this.permisoService.delete(id).subscribe(
      data=>{
        alert("Se ha eliminado el Permiso");
        this.cargarPermisos();
      }, err=>{
        console.log(err);
      }
    )
  }  

}
