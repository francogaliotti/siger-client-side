import { Component, OnInit } from '@angular/core';
import { EstadoBoleta } from '../../models/estado-boleta';
import { EstadoBoletasService } from '../../services/estado-boletas.service';

@Component({
  selector: 'app-lista-estado-boleta',
  templateUrl: './lista-estado-boleta.component.html',
  styleUrls: ['./lista-estado-boleta.component.css']
})
export class ListaEstadoBoletaComponent implements OnInit {

  estadoBoleta: EstadoBoleta[] = [];

  constructor(private _estadoBoletaService: EstadoBoletasService) { 
  }

  ngOnInit(): void {
    this.cargarEstadoBoleta();
  }

  cargarEstadoBoleta():void{
    this._estadoBoletaService.list().subscribe(
      data => {
        this.estadoBoleta = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrarEstadoBoleta(id?:number):void{
    this._estadoBoletaService.delete(id).subscribe(
      data => {
        alert('Se ha eliminado el Estado de Boleta satisfactoriamente')
        this.cargarEstadoBoleta();
      },
      err => {
        alert(err.error.mensaje);
      }
    );
  }

}
