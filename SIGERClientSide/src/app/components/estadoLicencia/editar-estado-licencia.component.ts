import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadoLicencia } from 'src/app/models/estado-licencia';
import { EstadoLicenciaService } from 'src/app/services/estado-licencia.service';

@Component({
  selector: 'app-editar-estado-licencia',
  templateUrl: './editar-estado-licencia.component.html',
  styleUrls: ['./editar-estado-licencia.component.css']
})
export class EditarEstadoLicenciaComponent implements OnInit {

  estadoLicencia: EstadoLicencia = new EstadoLicencia('','');
  estadoLicenciaForm: FormGroup;

  constructor(
    private _estadoLicencia: FormBuilder,
    private _estadoLicenciaService: EstadoLicenciaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.estadoLicenciaForm = this._estadoLicencia.group({
      id: ['',Validators.required],
      codEstadoLicencia: ['', [Validators.required, Validators.maxLength(10)]],
      nombreEstadoLicencia: ['', Validators.required]
   });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this._estadoLicenciaService.detail(id).subscribe(
      data => {
        this.estadoLicencia = data;
        console.log(this.estadoLicencia);
      },
      err => {
        console.log(err);
        //this.router.navigate(['/']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.estadoLicencia.codEstadoLicencia = this.estadoLicenciaForm.get('codEstadoLicencia')?.value;
    this.estadoLicencia.nombreEstadoLicencia = this.estadoLicenciaForm.get('nombreEstadoLicencia')?.value;
    this._estadoLicenciaService.update(id, this.estadoLicencia).subscribe(
      data => {
        alert('Estado de Licencia actualizado Satisfactoriamente');
        this.router.navigate(['/estadoLicencia']);
      },
      err => {
        console.log(err);
        this.router.navigate(['/estadoLicencia']);
      }
    );
  }

}
