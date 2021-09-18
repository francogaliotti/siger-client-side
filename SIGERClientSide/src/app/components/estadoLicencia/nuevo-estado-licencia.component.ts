import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstadoLicencia } from 'src/app/models/estado-licencia';
import { EstadoLicenciaService } from 'src/app/services/estado-licencia.service';

//External

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo-estado-licencia',
  templateUrl: './nuevo-estado-licencia.component.html',
  styleUrls: ['./nuevo-estado-licencia.component.css']
})
export class NuevoEstadoLicenciaComponent implements OnInit {

  estadoLicenciaForm: FormGroup;

  constructor(private _estadoLicencia: FormBuilder,private _estadoLicenciaService: EstadoLicenciaService,
    private router: Router) { 
      this.estadoLicenciaForm = this._estadoLicencia.group({
        codEstadoLicencia: ['', [Validators.required, Validators.maxLength(10)]],
        nombreEstadoLicencia: ['', Validators.required]
      });
    }

  ngOnInit(): void {
  }

  onCreate():void{
    const estadoLicencia = new EstadoLicencia(this.estadoLicenciaForm.get('codEstadoLicencia')?.value,
    this.estadoLicenciaForm.get('nombreEstadoLicencia')?.value);
    this._estadoLicenciaService.save(estadoLicencia).subscribe(
      data => {
        alert('Estado de Licencia creado Satisfactoriamente');
        this.router.navigate(['estadoLicencia']);
      },
      err => {
        alert(err.console.mensaje);
        this.router.navigate(['/estadoLicencia']);
      }
    );
  }

}
