import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEdit, faEye, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
import { Movilidad } from 'src/app/models/movilidad';
import { TipoMovilidad } from 'src/app/models/tipo-movilidad';
import { MovilidadService } from 'src/app/services/movilidad.service';
import { TokenService } from 'src/app/services/token.service';
import { TipoMovilidadService } from 'src/app/services/tipo-movilidad.service';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-movilidad',
  templateUrl: './movilidad.component.html',
  styleUrls: ['./movilidad.component.css']
})
export class MovilidadComponent implements OnInit {

  movilidad: Movilidad[] = [];
  movilidadForm: FormGroup;
  editmovilidadForm: FormGroup;
  testModal: Modal | undefined;
  modal: Modal | undefined;
  newMovilidad: Movilidad = new Movilidad('', '', new TipoMovilidad('',''));
  tipoMovilidadArray: TipoMovilidad[] = [];

  faEdit = faEdit;
  faTrash = faTrash;
  faPlusCircle = faPlusCircle;
  faEye = faEye;

  isAdmin = false;

  searchPage = 0;
  page = 0;
  search: string = '';
  success: boolean;
  ExistPatente: boolean;


  constructor(private _movilidad: FormBuilder, private _movilidadService: MovilidadService, private _tipoMovilidadService: TipoMovilidadService,
    private router: Router, private _editMovilidad: FormBuilder, private _tokenService: TokenService) {
    this.movilidadForm = this._movilidad.group({
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      patente: ['', [Validators.required, Validators.pattern(/^[A-Z]{3,3}\d{3,3}$|^[A-Z]{2,2}\d{3,3}[A-Z]{2,2}$/)]],
      tipoMovilidad: ['', [Validators.required]]
    })
    this.editmovilidadForm = this._editMovilidad.group({
      id: ['', Validators.required],
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      patente: ['', Validators.required],
      tipoMovilidad: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.cargarMovilidad();
    this.TipoMovilidadList();
    this.isAdmin = this._tokenService.IsAdmin();
  }

  TipoMovilidadList() {
    this._tipoMovilidadService.list(0).subscribe(
      data => {
        this.tipoMovilidadArray = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarMovilidad() {
    this._movilidadService.list(0).subscribe(
      data => {
        this.movilidad = data;
        
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

  borrarMovilidad(id?: number): void {
    this._movilidadService.delete(id).subscribe(
      data => {
        Swal.fire({
          title: "Éxito al eliminar",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarMovilidad();
      },
      err => {
        Swal.fire({
          title: "Oops! hubo un problema",
          icon: "error",
          showCloseButton: false,
          showConfirmButton: false
        }
        );
      });
  }
  onCreate(): boolean {
    this.success = false;
    const movilidad = new Movilidad(this.movilidadForm.get('codigo')?.value, 
    this.movilidadForm.get('patente')?.value, 
    this.movilidadForm.get('tipoMovilidad')?.value);
    if (this.movilidadForm.valid && !this.ExistPatente) {
      console.log(movilidad);
      this._movilidadService.save(movilidad).subscribe(
        data => {
          this.success = true;

          Swal.fire({
            title: "Éxito al crear",
            icon: "success",
            showCloseButton: false,
            showConfirmButton: false
          });
          this.cargarMovilidad();
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
  cargarMovilidadForUpdate(id?: number): void {
    this._movilidadService.detail(id).subscribe(
      data => {
        this.newMovilidad = data;
        console.log(this.newMovilidad);
        this.editmovilidadForm = this._editMovilidad.group({
          id: [this.newMovilidad.id, Validators.required],
          codigo: [this.newMovilidad.codigo, [Validators.required, Validators.maxLength(10)]],
          patente: [this.newMovilidad.patente, Validators.required],
          tipoMovilidad: [this.newMovilidad.tipoMovilidad]
        });
      },
      err => {
        alert(err);
      }
    )
  }
  open(id?: number): void {
    this.testModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
      keyboard: false
    })
    this.cargarMovilidadForUpdate(id);
    this.testModal?.show();
  }

  onUpdate(id?: number): void {
    this.newMovilidad.codigo = this.editmovilidadForm.get('codigo')?.value;
    this.newMovilidad.patente = this.editmovilidadForm.get('patente')?.value;
    this.newMovilidad.tipoMovilidad = this.editmovilidadForm.get('tipoMovilidad')?.value;
    if(this.editmovilidadForm.valid && !this.ExistPatente){
      this._movilidadService.update(id, this.newMovilidad).subscribe(
        data => {
          Swal.fire({
            title: "Éxito al actualizar",
            icon: "success",
            showCloseButton: false,
            showConfirmButton: false
          });
          this.cargarMovilidad();
          this.testModal?.hide();
        },
        err => {
          Swal.fire({
            title: "Oops! hubo un problema",
            icon: "error",
            showCloseButton: false,
            showConfirmButton: false
          });
          console.log(err)
          this.testModal?.hide();
        }
      );
    }
   
  }
  openDetail(id?: number): void {
    this.modal = new bootstrap.Modal(document.getElementById('detalleModal'), {
      keyboard: false
    })
    this.cargarMovilidadForDetail(id);
    this.modal?.show();
  }
  cargarMovilidadForDetail(id?: number): void {
    this._movilidadService.detail(id).subscribe(
      data => {
        this.newMovilidad = data;
      },
      err => {
        alert(err.error.mensaje);
        this.volver();
      }
    );
  }
  volver(): void {
    this.modal?.hide();
    this.router.navigate(['/movilidad']);
  }

  async alreadyExistPatente(){

    this.ExistPatente = false;

    if(this.movilidadForm.get('patente')?.valid){
      this.ExistPatente = await this._movilidadService.alreadyExistPatente(this.movilidadForm.get('patente')?.value).toPromise();
    }
  }

  async alreadyExistPatente_Modification(){

    this.ExistPatente = false;

    if(this.editmovilidadForm.get('patente')?.valid){
      this.ExistPatente = await this._movilidadService.alreadyExistPatente(this.editmovilidadForm.get('patente')?.value).toPromise();
    }
  }
}
