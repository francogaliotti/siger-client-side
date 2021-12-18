import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstadoLicencia } from 'src/app/models/estado-licencia';
import { EstadoLicenciaService } from 'src/app/services/estado-licencia.service';
import { Modal } from 'bootstrap';
import { faEdit, faFileAlt, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as bootstrap from 'bootstrap';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-estado-licencia',
  templateUrl: './lista-estado-licencia.component.html',
  styleUrls: ['./lista-estado-licencia.component.css']
})
export class ListaEstadoLicenciaComponent implements OnInit {

  estadoLicencia: EstadoLicencia[] = [];
  estadoLicenciaForm: FormGroup;
  editEstadoLicenciaForm: FormGroup;
  testModal: Modal | undefined;
  newEstadoLicencia: EstadoLicencia = new EstadoLicencia('', '');

  faEdit = faEdit;
  faTrash = faTrash;
  faPlusCircle = faPlusCircle;

  roles: string[];
  isAdmin = false;


  constructor(private _estadoLicencia: FormBuilder, private _estadoLicenciaService: EstadoLicenciaService,
    private router: Router, private _editEstadoLicencia: FormBuilder, private _tokenService: TokenService) {
    this.estadoLicenciaForm = this._estadoLicencia.group({
      codEstadoLicencia: ['', [Validators.required, Validators.maxLength(10)]],
      nombreEstadoLicencia: ['', Validators.required]
    });
    this.editEstadoLicenciaForm = this._editEstadoLicencia.group({
      id: ['', Validators.required],
      codEstadoLicencia: ['', [Validators.required, Validators.maxLength(10)]],
      nombreEstadoLicencia: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.cargarEstadoLicencia();
    this.isAdmin = this._tokenService.IsAdmin();
  }

  cargarEstadoLicencia(): void {
    this._estadoLicenciaService.list().subscribe(
      data => {
        this.estadoLicencia = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrarEstadoLicencia(id?: number): void {
    this._estadoLicenciaService.delete(id).subscribe(
      data => {
        Swal.fire({
          title: "Éxito al eliminar",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarEstadoLicencia();
      },
      err => {
        alert(err.error.mensaje);
      }
    );
  }
  onCreate(): void {
    const estadoLicencia = new EstadoLicencia(this.estadoLicenciaForm.get('codEstadoLicencia')?.value,
      this.estadoLicenciaForm.get('nombreEstadoLicencia')?.value);
    this._estadoLicenciaService.save(estadoLicencia).subscribe(
      data => {
        Swal.fire({
          title: "Éxito al crear",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarEstadoLicencia();
        this.router.navigate(['/estadoLicencia']);
      },
      err => {
        alert(err.console.mensaje);
        this.router.navigate(['/estadoLicencia']);
      }
    );
  }


  open(id?: number): void {
    this.testModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
      keyboard: false
    })
    this.cargarEstadoLicenciaForUpdate(id);
    this.testModal?.show();
  }


  cargarEstadoLicenciaForUpdate(id?: number): void {
    this._estadoLicenciaService.detail(id).subscribe(
      data => {
        this.newEstadoLicencia = data;
        console.log(this.newEstadoLicencia);
        this.editEstadoLicenciaForm = this._editEstadoLicencia.group({
          id: [this.newEstadoLicencia.id, Validators.required],
          codEstadoLicencia: [this.newEstadoLicencia.codEstadoLicencia, [Validators.required, Validators.maxLength(10)]],
          nombreEstadoLicencia: [this.newEstadoLicencia.nombreEstadoLicencia, Validators.required]
        });
      },
      err => {
        alert(err);
      }
    );
  }

  onUpdate(id?: number): void {
    this.newEstadoLicencia.codEstadoLicencia = this.editEstadoLicenciaForm.get('codEstadoLicencia')?.value;
    this.newEstadoLicencia.nombreEstadoLicencia = this.editEstadoLicenciaForm.get('nombreEstadoLicencia')?.value;
    this._estadoLicenciaService.update(id, this.newEstadoLicencia).subscribe(
      data => {
        Swal.fire({
          title: "Éxito al actualizar",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarEstadoLicencia();
        this.testModal?.hide();
      },
      err => {
        alert(err);
      }
    );

  }

}
