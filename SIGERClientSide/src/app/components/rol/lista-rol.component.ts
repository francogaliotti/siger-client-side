import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-lista-rol',
  templateUrl: './lista-rol.component.html',
  styleUrls: ['./lista-rol.component.css']
})
export class ListaRolComponent implements OnInit {

  roles:Rol[]=[];

  constructor(private rolService: RolService) { }

  ngOnInit(): void {
    this.cargarRoles();
  }
  cargarRoles():void{
    this.rolService.list().subscribe(
      data=>{
        this.roles=data;
        console.log(this.roles)
      }, err=>{
        console.log(err);
      }
    )
  }
  borrarRol(id?:number):void{
    this.rolService.delete(id).subscribe(
      data=>{
        alert("Se ha eliminado el Rol");
        this.cargarRoles();
      }, err=>{
        console.log(err);
      }
    )
  }

}
