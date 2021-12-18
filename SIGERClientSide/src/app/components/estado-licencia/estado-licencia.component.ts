import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstadoLicencia } from 'src/app/models/estado-licencia';
import { EstadoLicenciaService } from 'src/app/services/estado-licencia.service';
import { Modal } from 'bootstrap';
import { faEdit, faFileAlt, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as bootstrap from 'bootstrap';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-estado-licencia',
  templateUrl: './estado-licencia.component.html',
  styleUrls: ['./estado-licencia.component.css']
})
export class EstadoLicenciaComponent implements OnInit {

  estadoLicencia: EstadoLicencia[] = [];
  estadoLicenciaForm: FormGroup;
  editEstadoLicenciaForm: FormGroup;
  testModal: Modal | undefined;
  newEstadoLicencia: EstadoLicencia = new EstadoLicencia('', '');

  faEdit = faEdit;
  faTrash = faTrash;
  faPlusCircle = faPlusCircle;

  isAdmin = false;

  searchPage = 0;
  page = 0;
  search: string = '';


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
    this._estadoLicenciaService.list(this.searchPage).subscribe(
      data => {
        this.estadoLicencia = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  nextPage() {
    this.page += 10;
    this.searchPage = this.searchPage + 1;
  }

  prevPage() {
    if ( this.page > 0 )
      this.page -= 10;
      this.searchPage = this.searchPage - 1;
  }

  onSearch( search: string ) {
    this.page = 0;
    this.search = search;
  }

  borrarEstadoLicencia(id?: number): void {
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
  onCreate(): void {
    const estadoLicencia = new EstadoLicencia(this.estadoLicenciaForm.get('codEstadoLicencia')?.value,
      this.estadoLicenciaForm.get('nombreEstadoLicencia')?.value);
    this._estadoLicenciaService.save(estadoLicencia).subscribe(
      data => {
        alert('Estado de Licencia creado Satisfactoriamente');
        this.cargarEstadoLicencia();
        this.router.navigate(['/estadoLicencia']);
      },
      err => {
        alert(err.console.mensaje);
        this.router.navigate(['/estado-licencia']);
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
        alert('Estado de Licencia actualizado Satisfactoriamente');
        this.cargarEstadoLicencia();
        this.testModal?.hide();
      },
      err => {
        alert(err);
      }
    );

  }

}
