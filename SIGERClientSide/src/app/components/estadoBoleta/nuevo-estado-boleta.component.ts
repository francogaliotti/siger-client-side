import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstadoBoleta } from '../../models/estado-boleta';
import { EstadoBoletasService } from '../../services/estado-boletas.service';

//External

import Swal, { SweetAlertGrow, SweetAlertResult, SweetAlertShowClass } from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo-estado-boleta',
  templateUrl: './nuevo-estado-boleta.component.html',
  styleUrls: ['./nuevo-estado-boleta.component.css']
})
export class NuevoEstadoBoletaComponent implements OnInit {

  estadoBoletaForm: FormGroup;

  constructor(private _estadoBoleta: FormBuilder,private _estadoBoletaService: EstadoBoletasService,
    private router: Router) { 
      this.estadoBoletaForm = this._estadoBoleta.group({
        codEstadoBoleta: ['', [Validators.required, Validators.maxLength(10)]],
        nombreEstadoBoleta: ['', Validators.required]
      });
    }

  ngOnInit(): void {
  }

  onCreate():void{
    const estadoBoleta = new EstadoBoleta(this.estadoBoletaForm.get('codEstadoBoleta')?.value,
    this.estadoBoletaForm.get('nombreEstadoBoleta')?.value);
    this._estadoBoletaService.save(estadoBoleta).subscribe(
      data => {
        alert('Estado de Boleta creado Satisfactoriamente');
        this.router.navigate(['estadoBoleta']);
      },
      err => {
        alert(err.console.mensaje);
        this.router.navigate(['/estadoBoleta']);
      }
    );
  }

}
