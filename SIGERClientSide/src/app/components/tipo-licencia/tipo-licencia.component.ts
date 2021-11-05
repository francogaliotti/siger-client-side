import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Modal } from 'bootstrap';
import { faEdit, faFileAlt, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as bootstrap from 'bootstrap';
import { TokenService } from 'src/app/services/token.service';
import { TipoLicencia } from 'src/app/models/tipo-licencia';
import { TipoLicenciaService } from 'src/app/services/tipo-licencia.service';
import { TipoLicenciaDTO } from 'src/app/dto/tipoLicenciaDTO';
import * as $ from 'jquery';

@Component({
  selector: 'tipo-licencia',
  templateUrl: './tipo-licencia.component.html',
  styleUrls: ['./tipo-licencia.component.css']
})
export class TipoLicenciaComponent implements OnInit {

  tipoLicencia: TipoLicenciaDTO[] = [];
  tipoLicenciaForm: FormGroup;
  editTipoLicenciaForm: FormGroup;
  testModal: Modal | undefined;
  newTipoLicencia: TipoLicenciaDTO = new TipoLicenciaDTO();

  faEdit = faEdit;
  faTrash = faTrash;
  faPlusCircle = faPlusCircle;

  roles: string[];
  isAdmin = false;


  constructor(private _tipoLicencia: FormBuilder, private _tipoLicenciaService: TipoLicenciaService,
    private router: Router, private _editTipoLicencia: FormBuilder, private _tokenService: TokenService) {
    this.tipoLicenciaForm = this._tipoLicencia.group({
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      denominacion: ['', Validators.required],
    });
    this.editTipoLicenciaForm = this._editTipoLicencia.group({
      id: ['', Validators.required],
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      denominacion: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.cargarTipoLicencia();
    this.isAdmin = this._tokenService.IsAdmin();
  }

  cargarTipoLicencia(): void {
    this._tipoLicenciaService.list().subscribe(
      data => {
        this.tipoLicencia = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrarTipoLicencia(id?: number): void {
    this._tipoLicenciaService.delete(id).subscribe(
      data => {
        alert('Se ha eliminado el Tipo de Licencia satisfactoriamente')
        this.cargarTipoLicencia();
      },
      err => {
        alert(err.error.mensaje);
      }
    );
  }
  onCreate(): void {
    const tipoLicencia = new TipoLicenciaDTO();
      tipoLicencia.codigo=this.tipoLicenciaForm.get('codigo')?.value;
      tipoLicencia.denominacion = this.tipoLicenciaForm.get('denominacion')?.value
    this._tipoLicenciaService.save(tipoLicencia).subscribe(
      data => {
        alert('Tipo de Licencia creado Satisfactoriamente');
        this.cargarTipoLicencia();
        this.router.navigate(['/tipoLicencia']);
      },
      err => {
        alert(err.console.mensaje);
        this.router.navigate(['/tipoLicencia']);
      }
    );
  }


  open(id?: number): void {
    this.testModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
      keyboard: false
    })
    this.cargarTipoLicenciaForUpdate(id);
    this.testModal?.show();
  }


  cargarTipoLicenciaForUpdate(id?: number): void {
    this._tipoLicenciaService.detail(id).subscribe(
      data => {
        this.newTipoLicencia = data;
        console.log(this.newTipoLicencia);
        this.editTipoLicenciaForm = this._editTipoLicencia.group({
          id: [this.newTipoLicencia.id, Validators.required],
          codigo: [this.newTipoLicencia.codigo, [Validators.required, Validators.maxLength(10)]],
          denominacion: [this.newTipoLicencia.denominacion, Validators.required]
        });
      },
      err => {
        alert(err);
      }
    );
  }

  onUpdate(id?: number): void {
    this.newTipoLicencia.codigo = this.editTipoLicenciaForm.get('codigo')?.value;
    this.newTipoLicencia.denominacion = this.editTipoLicenciaForm.get('denominacion')?.value;
    this._tipoLicenciaService.update(id, this.newTipoLicencia).subscribe(
      data => {
        alert('Tipo de Licencia actualizado Satisfactoriamente');
        this.cargarTipoLicencia();
        this.testModal?.hide();
      },
      err => {
        alert(err);
      }
    );

  }

}
