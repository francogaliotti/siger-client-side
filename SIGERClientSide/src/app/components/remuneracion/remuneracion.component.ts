import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowAltCircleLeft, faEdit, faEye, faFileAlt, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { Remuneracion } from 'src/app/models/remuneracion';
import { RemuneracionService } from 'src/app/services/remuneracion.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-remuneracion',
  templateUrl: './remuneracion.component.html',
  styleUrls: ['./remuneracion.component.css']
})
export class RemuneracionComponent implements OnInit {

  fapluscircle = faPlusCircle;
  faEdit = faEdit;
  faFileAlt = faFileAlt;
  faTrash = faTrash;
  faArrow = faArrowAltCircleLeft;
  faEye = faEye;

  remuneracion: Remuneracion = new Remuneracion(0, 0, 0, 0);

  remuneracionArray: Remuneracion[] = [];

  remuneracionForm: FormGroup;

  editRemuneracionForm: FormGroup;

  success: boolean;

  modal: Modal | undefined

  @ViewChild("CreatePermission") CreatePermission: ElementRef;

  @ViewChild("EditPermission") EditPermission: ElementRef;

  isAdmin = false;

  searchPage = 0;
  page = 0;
  search: string = '';

  constructor(
    private _remuneracion: FormBuilder,
    private _editRemuneracion: FormBuilder,
    private _remuneracionService: RemuneracionService,
    private router: Router,
    private renderer: Renderer2,
    private _tokenService: TokenService
  ) {
    this.remuneracionForm = this._remuneracion.group({
      valorHora: ['', [Validators.required]],
      valorViaticoDia: ['', Validators.required],
      importeHorasAdicionales: ['', [Validators.required]],
      importeZonaDesarraigo: ['', Validators.required]
    });
    this.editRemuneracionForm = this._editRemuneracion.group({
      id: ["", Validators.required],
      valorHora: ['', [Validators.required]],
      valorViaticoDia: ['', Validators.required],
      importeHorasAdicionales: ['', [Validators.required]],
      importeZonaDesarraigo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarRemuneraciones();
    this.isAdmin = this._tokenService.IsAdmin();
  }

  cargarRemuneraciones(): void {
    this._remuneracionService.page(this.searchPage)
      .subscribe(data => {
        this.remuneracionArray = data;
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

  borrarRemuneracion(id?: number): void {
    this._remuneracionService.delete(id).subscribe(
      data => {
        Swal.fire({
          title: "Éxito",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarRemuneraciones();
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
    const remuneracion = new Remuneracion(
      this.remuneracionForm.get('valorHora')?.value,
      this.remuneracionForm.get('valorViaticoDia')?.value,
      this.remuneracionForm.get('importeHorasAdicionales')?.value,
      this.remuneracionForm.get('importeZonaDesarraigo')?.value);

    if (this.remuneracionForm.valid == true) {
      this._remuneracionService.save(remuneracion).subscribe(
        data => {
          this.success = true;
          this.cargarRemuneraciones();
          Swal.fire({
            title: "Éxito",
            icon: "success",
            showCloseButton: false,
            showConfirmButton: false
          });
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
    return this.success;
  }

  openToEdit(id?: number): void {
    this.modal = new bootstrap.Modal(document.getElementById('editarModal'), {
      keyboard: false
    })
    this.cargarRemuneracionForUpdate(id);
    this.modal?.show();
  }

  cargarRemuneracionForUpdate(id?: number): void {
    this._remuneracionService.detail(id).subscribe(
      data => {
        this.remuneracion = data;
        console.log(this.remuneracion);
        this.editRemuneracionForm = this._editRemuneracion.group({
          id: [this.remuneracion.id, Validators.required],
          valorHora: ['', [Validators.required]],
          valorViaticoDia: ['', Validators.required],
          importeHorasAdicionales: ['', [Validators.required]],
          importeZonaDesarraigo: ['', Validators.required]
        });
      },
      err => {
        alert(err);
      }
    );
  }

  onUpdate(id?: number): void {
    this.remuneracion.valorHora = this.editRemuneracionForm.get('valorHora')?.value;
    this.remuneracion.valorViaticoDia = this.editRemuneracionForm.get('valorViaticoDia')?.value;
    this.remuneracion.importeHorasAdicionales = this.editRemuneracionForm.get('importeHorasAdicionales')?.value;
    this.remuneracion.importeZonaDesarraigo = this.editRemuneracionForm.get('importeZonaDesarraigo')?.value;
    this._remuneracionService.update(id, this.remuneracion).subscribe(
      data => {
        Swal.fire({
          title: "Éxito",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarRemuneraciones();
        this.modal?.hide();
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

  openDetail(id?: number): void {
    this.modal = new bootstrap.Modal(document.getElementById('detalleModal'), {
      keyboard: false
    })
    this.cargarRemuneracionForDetail(id);
    this.modal?.show();
  }

  cargarRemuneracionForDetail(id?: number): void {
    this._remuneracionService.detail(id).subscribe(
      data => {
        this.remuneracion = data;
      },
      err => {
        alert(err.error.mensaje);
        this.volver();
      }
    );
  }

  volver(): void {
    this.modal?.hide();
    this.router.navigate(['remuneracion']);
  }

  checkRemuneracionForm(): void {
    if (this.remuneracionForm.get('valorHora')?.valid && this.remuneracionForm.get('valorViaticoDia')?.valid
      && this.remuneracionForm.get('importeHorasAdicionales')?.valid && this.remuneracionForm.get('importeZonaDesarraigo')?.valid) {
      this.renderer.setProperty(this.CreatePermission.nativeElement, 'disabled', false);
    } else {
      this.renderer.setProperty(this.CreatePermission.nativeElement, 'disabled', true);
    }
  }

  checkEditRemuneracionForm(): void {
    if (this.editRemuneracionForm.get('valorHora')?.valid && this.editRemuneracionForm.get('valorViaticoDia')?.valid
      && this.editRemuneracionForm.get('importeHorasAdicionales')?.valid && this.editRemuneracionForm.get('importeZonaDesarraigo')?.valid) {
      this.renderer.setProperty(this.EditPermission.nativeElement, 'disabled', false);
    } else {
      this.renderer.setProperty(this.EditPermission.nativeElement, 'disabled', true);
    }
  }

  close(): void {
    this.modal.hide();
  }

}
