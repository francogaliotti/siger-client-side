import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadoLicencia } from 'src/app/models/estado-licencia';
import { EstadoLicenciaService } from 'src/app/services/estado-licencia.service';

@Component({
  selector: 'app-detalle-estado-licencia',
  templateUrl: './detalle-estado-licencia.component.html',
  styleUrls: ['./detalle-estado-licencia.component.css']
})
export class DetalleEstadoLicenciaComponent implements OnInit {

  estadoLicencia: EstadoLicencia;

  constructor(
    private _estadoLicenciaService: EstadoLicenciaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this._estadoLicenciaService.detail(id).subscribe(
      data => {
        this.estadoLicencia = data;
      },
      err => {
        alert(err.error.mensaje);
        this.volver();
      }
    );
  }

  volver(): void {
    this.router.navigate(['estadoLicencia']);
  }

}
