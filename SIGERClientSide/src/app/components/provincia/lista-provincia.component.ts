import { Component, OnInit } from '@angular/core';
import { Provincia } from 'src/app/models/provincia';
import { ProvinciaService } from 'src/app/services/provincia.service';

@Component({
  selector: 'app-lista-provincia',
  templateUrl: './lista-provincia.component.html',
  styleUrls: ['./lista-provincia.component.css']
})
export class ListaProvinciaComponent implements OnInit {
  provincias:Provincia[];

  constructor(private provinciaService:ProvinciaService) { }

  ngOnInit(): void {
    this.cargarProvincias();
  }
  cargarProvincias():void{
    this.provinciaService.list().subscribe(
      data=>{
        this.provincias=data
      }, err=>{
        console.log(err);
      }
    )
  }
  borrarProvincia(id?:number):void{
    this.provinciaService.delete(id).subscribe(
      data=>{
        this.provincias=data;
        alert("Provincia eliminada");
        this.cargarProvincias();
      }, err=>{
        console.log(err);
      }
    )
  }

}
