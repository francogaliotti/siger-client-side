import { Component, OnInit } from '@angular/core';
import { EstadoLicencia } from 'src/app/models/estado-licencia';
import { EstadoLicenciaService } from 'src/app/services/estado-licencia.service';

@Component({
  selector: 'app-lista-estado-licencia',
  templateUrl: './lista-estado-licencia.component.html',
  styleUrls: ['./lista-estado-licencia.component.css']
})
export class ListaEstadoLicenciaComponent implements OnInit {

  estadoLicencia: EstadoLicencia[] = []

  constructor(private _estadoLicenciaService: EstadoLicenciaService) { }

  ngOnInit(): void {
    this.cargarEstadoLicencia();
  }

  cargarEstadoLicencia():void{
    this._estadoLicenciaService.list().subscribe(
      data => {
        this.estadoLicencia = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrarEstadoLicencia(id?:number):void{
    this._estadoLicenciaService.delete(id).subscribe(
      data => {
        alert('Se ha eliminado el Estado de Licencia satisfactoriamente')
        this.cargarEstadoLicencia();
      },
      err => {
        alert(err.error.mensaje);
      }
    );
  }

}
