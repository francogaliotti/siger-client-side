import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadoBoleta } from '../../models/estado-boleta';
import { EstadoBoletasService } from '../../services/estado-boletas.service';

@Component({
  selector: 'app-detalle-estado-boleta',
  templateUrl: './detalle-estado-boleta.component.html',
  styleUrls: ['./detalle-estado-boleta.component.css']
})
export class DetalleEstadoBoletaComponent implements OnInit {

  estadoBoleta: EstadoBoleta;

  constructor(
    private _estadoBoletaService: EstadoBoletasService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this._estadoBoletaService.detail(id).subscribe(
      data => {
        this.estadoBoleta = data;
      },
      err => {
        alert(err.error.mensaje);
        this.volver();
      }
    );
  }

  volver(): void {
    this.router.navigate(['estadoBoleta']);
  }

}
