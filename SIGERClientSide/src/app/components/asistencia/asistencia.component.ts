import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowAltCircleLeft, faEdit, faEye, faFileAlt, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { data } from 'jquery';
import { Asistencia } from 'src/app/models/asistencia';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {

  fapluscircle = faPlusCircle;
  faEdit = faEdit;
  //faFileAlt = faFileAlt;
  faEye = faEye;
  faTrash = faTrash;
  faArrow = faArrowAltCircleLeft;

  empleado: Empleado = new Empleado();

  asistencia: Asistencia = new Asistencia('', '',this.empleado,0);

  asistenciaArray: Asistencia[] = [];

  asistenciaForm: FormGroup;

  editAsistenciaForm: FormGroup;

  success: boolean;

  modal: Modal | undefined

  @ViewChild("CreatePermission") CreatePermission: ElementRef;

  @ViewChild("EditPermission") EditPermission: ElementRef;

  isAdmin = false;

  searchPage = 0;
  page = 0;
  search: string = '';

  constructor(
    private _asistencia: FormBuilder,
    private _editAsistencia: FormBuilder,
    private _asistenciaService: AsistenciaService,
    private _empleadoService: EmpleadoService,
    private router: Router,
    private renderer: Renderer2,
    private _tokenService: TokenService
  ) {
    this.asistenciaForm = this._asistencia.group({
      fechaHora: ['', [Validators.required, Validators.maxLength(10)]],
      tipoMovimiento: ['', Validators.required],
      empleado: ['', Validators.required]
    });
    this.editAsistenciaForm = this._editAsistencia.group({
      id: ["", Validators.required],
      fechaHora: ["", [Validators.required, Validators.maxLength(10)]],
      tipoMovimiento: ["", Validators.required],
      empleado: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.cargarAsistencia();
    this.isAdmin = this._tokenService.IsAdmin();
  }

  cargarAsistencia(): void {
    console.log(this.searchPage);
    this._asistenciaService.list(this.searchPage).subscribe(
      data => {
        this.asistenciaArray = data;
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
    if (this.page > 0)
      this.page -= 10;
    this.searchPage = this.searchPage - 1;
  }

  onSearch(search: string) {
    this.page = 0;
    this.search = search;
  }

  borrarAsistencia(id?: number): void {
    this._asistenciaService.delete(id).subscribe(
      data => {
        Swal.fire({
          title: "Éxito",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarAsistencia();
      },
      err => {
        Swal.fire({
          title: "Oops! hubo un problema",
          icon: "error",
          showCloseButton: false,
          showConfirmButton: false
        });
      }
    );
  }

  onCreate(): boolean {
    this.success = false;
    const asistencia = new Asistencia(this.asistenciaForm.get('fechaHora')?.value,
      this.asistenciaForm.get('tipoMovimiento')?.value, this.asistenciaForm.get('empleado')?.value);

    if (this.asistenciaForm.valid == true) {
      this._asistenciaService.save(asistencia).subscribe(
        data => {
          this.success = true;
          this.cargarAsistencia();

          Swal.fire({
            title: "Éxito",
            icon: "success",
            showCloseButton: false,
            showConfirmButton: false
          });
        },
        err => {
          alert(err.console.mensaje);
          Swal.fire({
            title: "Oops! hubo un problema",
            icon: "error",
            showCloseButton: false,
            showConfirmButton: false
          });
        }
      );
    }
    return this.success;
  }

  openEdit(id?: number): void {
    this.modal = new bootstrap.Modal(document.getElementById('editarModal'), {
      keyboard: false
    })
    this.cargarAsistenciaForUpdate(id);
    this.modal?.show();
  }

  cargarAsistenciaForUpdate(id?: number): void {
    this._asistenciaService.detail(id).subscribe(
      data => {
        this.asistencia = data;
        console.log(this.asistencia);
        this.editAsistenciaForm = this._editAsistencia.group({
          id: [this.asistencia.id, Validators.required],
          fechaHora: [this.asistencia.fechaHora, [Validators.required, Validators.maxLength(10)]],
          tipoMovimiento: [this.asistencia.tipoMovimiento, Validators.required],
          empleado: [this.asistencia.empleado, Validators.required]
        });
      },
      err => {
        alert(err);
      }
    );
  }

  onUpdate(id?: number): void {
    this.asistencia.fechaHora = this.editAsistenciaForm.get('fechaHora')?.value;
    this.asistencia.tipoMovimiento = this.editAsistenciaForm.get('tipoMovimiento')?.value;
    this.asistencia.empleado = this.editAsistenciaForm.get('empleado')?.value;
    this._asistenciaService.update(id, this.asistencia).subscribe(
      data => {
        this.cargarAsistencia();
        this.modal?.hide();

        Swal.fire({
          title: "Éxito",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
      },
      err => {
        alert(err);
        Swal.fire({
          title: "Oops! hubo un problema",
          icon: "error",
          showCloseButton: false,
          showConfirmButton: false
        });
      }
    );

  }

  openDetail(id?: number): void {
    this.modal = new bootstrap.Modal(document.getElementById('detalleModal'), {
      keyboard: false
    })
    this.cargarAsistenciaForDetail(id);
    this.modal?.show();
  }

  cargarAsistenciaForDetail(id?: number): void {
    this._asistenciaService.detail(id).subscribe(
      data => {
        this.asistencia = data;
      },
      err => {
        alert(err.error.mensaje);
        this.volver();
      }
    );
  }

  volver(): void {
    this.modal?.hide();
    this.router.navigate(['viatico']);
  }

  checkAsistenciaForm(): void {
    if (this.asistenciaForm.get('fechaHora')?.valid && this.asistenciaForm.get('tipoMovimiento')?.valid
      && this.asistenciaForm.get('empleado')?.valid) {
      this.renderer.setProperty(this.CreatePermission.nativeElement, 'disabled', false);
    } else {
      this.renderer.setProperty(this.CreatePermission.nativeElement, 'disabled', true);
    }
  }

  checkEditAsistenciaForm(): void {
    if (this.editAsistenciaForm.get('fechaHora')?.valid && this.editAsistenciaForm.get('tipoMovimiento')?.valid
      && this.editAsistenciaForm.get('empleado')?.valid) {
      this.renderer.setProperty(this.EditPermission.nativeElement, 'disabled', false);
    } else {
      this.renderer.setProperty(this.EditPermission.nativeElement, 'disabled', true);
    }
  }

  close(): void {
    this.modal.hide();
  }

}
