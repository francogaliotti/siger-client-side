import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowAltCircleLeft, faEdit, faEye, faFileAlt, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { RegimenHorario } from 'src/app/models/regimen-horario';
import { RegimenHorarioService } from 'src/app/services/regimen-horario.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';
import { TipoRegimenHorario } from 'src/app/models/tipo-regimen-horario';
import { TipoRegimenHorarioService } from 'src/app/services/tipo-regimen-horario.service';

@Component({
  selector: 'app-regimen-horario',
  templateUrl: './regimen-horario.component.html',
  styleUrls: ['./regimen-horario.component.css']
})
export class RegimenHorarioComponent implements OnInit {

  fapluscircle = faPlusCircle;
  faEdit = faEdit;
  faFileAlt = faFileAlt;
  faTrash = faTrash;
  faEye = faEye;
  faArrow = faArrowAltCircleLeft;

  tipoRegimenHorario: TipoRegimenHorario=null;

  regimenHorario: RegimenHorario = new RegimenHorario("", "", this.tipoRegimenHorario, 0);

  regimenHorarioArray: RegimenHorario[] = [];

  tipoRegimenHorarioArray: TipoRegimenHorario[] = [];

  regimenHorarioForm: FormGroup;

  editRegimenHorarioForm: FormGroup;

  success: boolean;

  modal: Modal | undefined

  @ViewChild("CreatePermission") CreatePermission: ElementRef;

  @ViewChild("EditPermission") EditPermission: ElementRef;

  isAdmin = false;

  nivelesAutorizacionArray: number[] = [1, 2, 3, 4];

  searchPage = 0;
  page = 0;
  search: string = '';

  constructor(
    private _regimenHorario: FormBuilder,
    private _editRegimenHorario: FormBuilder,
    private _regimenHorarioService: RegimenHorarioService,
    private _tipoRegimenHorarioService: TipoRegimenHorarioService,
    private router: Router,
    private renderer: Renderer2,
    private _tokenService: TokenService
  ) {
    this.regimenHorarioForm = this._regimenHorario.group({
      horaMinutoInicioJornadaLaboral: ['', [Validators.required, Validators.maxLength(10)]],
      horaMinutoFinJornadaLaboral: ['', [Validators.required, Validators.maxLength(10)]],
      tipoRegimenHorario:null
    });
    this.editRegimenHorarioForm = this._editRegimenHorario.group({
      id: ["", Validators.required],
      horaMinutoInicioJornadaLaboral: ['', [Validators.required, Validators.maxLength(10)]],
      horaMinutoFinJornadaLaboral: ['', [Validators.required, Validators.maxLength(10)]],
      tipoRegimenHorario:null
    });
  }

  ngOnInit(): void {
    this.cargarRegimenHorario();
    this.tipoRegimenHorarioList();
    this.isAdmin = this._tokenService.IsAdmin();
  }

  cargarRegimenHorario(): void {
    this._regimenHorarioService.list(this.searchPage).subscribe(
      data => {
        this.regimenHorarioArray = data;
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

  borrarRegimenHorario(id?: number): void {
    this._regimenHorarioService.delete(id).subscribe(
      data => {
        Swal.fire({
          title: "Éxito al eliminar",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarRegimenHorario();
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
    const regimenHorario = new RegimenHorario(
      this.regimenHorarioForm.get('horaMinutoInicioJornadaLaboral')?.value,
      this.regimenHorarioForm.get('horaMinutoFinJornadaLaboral')?.value,
      this.regimenHorarioForm.get('tipoRegimenHorario')?.value
      );
      

    if (this.regimenHorarioForm.valid == true) {
      console.log(regimenHorario);
      this._regimenHorarioService.save(regimenHorario).subscribe(
        data => {
          this.success = true;

          Swal.fire({
            title: "Éxito al crear",
            icon: "success",
            showCloseButton: false,
            showConfirmButton: false
          });
          this.cargarRegimenHorario();
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

  tipoRegimenHorarioList(): void {
    this._tipoRegimenHorarioService.list(this.searchPage).subscribe(
      data => {
        this.tipoRegimenHorarioArray = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  open(id?: number): void {
    this.modal = new bootstrap.Modal(document.getElementById('editarModal'), {
      keyboard: false
    })
    this.cargarRegimenHorarioForUpdate(id);
    this.modal?.show();
  }

  cargarRegimenHorarioForUpdate(id?: number): void {
    this._regimenHorarioService.detail(id).subscribe(
      data => {
        this.regimenHorario = data;
        console.log(this.regimenHorario);
        this.editRegimenHorarioForm = this._editRegimenHorario.group({
          id: [this.regimenHorario.id, Validators.required],
          horaMinutoInicioJornadaLaboral: [this.regimenHorario.horaMinutoInicioJornadaLaboral, [Validators.required, Validators.maxLength(10)]],
          horaMinutoFinJornadaLaboral: [this.regimenHorario.horaMinutoFinJornadaLaboral, [Validators.required, Validators.maxLength(10)]],
          tipoRegimenHorario: this.regimenHorario.tipoRegimenHorario,
          isInactive: this.regimenHorario.isActive
        });
      },
      err => {
        alert(err);
      }
    );
  }

  onUpdate(id?: number): void {
    this.regimenHorario.horaMinutoInicioJornadaLaboral = this.editRegimenHorarioForm.get('horaMinutoInicioJornadaLaboral')?.value;
    this.regimenHorario.horaMinutoFinJornadaLaboral = this.editRegimenHorarioForm.get('horaMinutoFinJornadaLaboral')?.value;
    this.regimenHorario.tipoRegimenHorario = this.editRegimenHorarioForm.get('tipoRegimenHorario')?.value;
    this.regimenHorario.isActive = this.editRegimenHorarioForm.get('isActive')?.value;
    this._regimenHorarioService.update(id, this.regimenHorario).subscribe(
      data => {
        Swal.fire({
          title: "Éxito al actualizar",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarRegimenHorario();
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
    this.cargarRegimenHorarioForDetail(id);
    this.modal?.show();
  }

  cargarRegimenHorarioForDetail(id?: number): void {
    this._regimenHorarioService.detail(id).subscribe(
      data => {
        this.regimenHorario = data;
      },
      err => {
        alert(err.error.mensaje);
        this.volver();
      }
    );
  }

  volver(): void {
    this.modal?.hide();
    this.router.navigate(['regimen-horario']);
  }

  checkRegimenHorarioForm(): void {
    if (this.regimenHorarioForm.get('horaMinutoInicioJornadaLaboral')?.valid && this.regimenHorarioForm.get('horaMinutoFinJornadaLaboral')?.valid && this.regimenHorarioForm.get('tipoRegimenHorario')?.valid) {
      this.renderer.setProperty(this.CreatePermission.nativeElement, 'disabled', false);
    } else {
      this.renderer.setProperty(this.CreatePermission.nativeElement, 'disabled', true);
    }
  }

  checkEditRegimenHorarioForm(): void {
    if (this.editRegimenHorarioForm.get('horaMinutoInicioJornadaLaboral')?.valid && this.editRegimenHorarioForm.get('horaMinutoFinJornadaLaboral')?.valid ) {
      this.renderer.setProperty(this.EditPermission.nativeElement, 'disabled', false);
    } else {
      this.renderer.setProperty(this.EditPermission.nativeElement, 'disabled', true);
    }
  }

}
