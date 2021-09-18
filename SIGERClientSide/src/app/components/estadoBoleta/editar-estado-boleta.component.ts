import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadoBoleta } from '../../models/estado-boleta';
import { EstadoBoletasService } from '../../services/estado-boletas.service';

@Component({
  selector: 'app-editar-estado-boleta',
  templateUrl: './editar-estado-boleta.component.html',
  styleUrls: ['./editar-estado-boleta.component.css']
})
export class EditarEstadoBoletaComponent implements OnInit {

  estadoBoleta: EstadoBoleta = new EstadoBoleta('','');
  estadoBoletaForm: FormGroup;

  constructor(
    private _estadoBoleta: FormBuilder,
    private _estadoBoletaService: EstadoBoletasService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.estadoBoletaForm = this._estadoBoleta.group({
      id: ['',Validators.required],
      codEstadoBoleta: ['', [Validators.required, Validators.maxLength(10)]],
      nombreEstadoBoleta: ['', Validators.required]
   });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this._estadoBoletaService.detail(id).subscribe(
      data => {
        this.estadoBoleta = data;
        console.log(this.estadoBoleta);
      },
      err => {
        console.log(err);
        //this.router.navigate(['/']);
      }
    );
    
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.estadoBoleta.codEstadoBoleta = this.estadoBoletaForm.get('codEstadoBoleta')?.value;
    this.estadoBoleta.nombreEstadoBoleta = this.estadoBoletaForm.get('nombreEstadoBoleta')?.value;
    this._estadoBoletaService.update(id, this.estadoBoleta).subscribe(
      data => {
        alert('Estado de Boleta actualizado Satisfactoriamente');
        this.router.navigate(['/estadoBoleta']);
      },
      err => {
        console.log(err);
        this.router.navigate(['/estadoBoleta']);
      }
    );
  }

}
