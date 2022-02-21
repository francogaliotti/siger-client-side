import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';
import { faEdit, faFileAlt, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoMovilidad } from 'src/app/models/tipo-movilidad';
import { TipoMovilidadService } from 'src/app/services/tipo-movilidad.service';
import { MovilidadService } from 'src/app/services/movilidad.service';
import { Movilidad } from 'src/app/models/movilidad';

@Component({
  selector: 'app-tipo-movilidad',
  templateUrl: './tipo-movilidad.component.html',
  styleUrls: ['./tipo-movilidad.component.css']
})
export class TipoMovilidadComponent implements OnInit {

  tipoMovilidad: TipoMovilidad[] = [];
  tipoMovilidadForm: FormGroup;
  editTipoMovilidadForm: FormGroup;
  testModal: Modal | undefined;
  newTipoMovilidad: TipoMovilidad = new TipoMovilidad('', '');
  movilidades: Movilidad[];

  faEdit = faEdit;
  faTrash = faTrash;
  faPlusCircle = faPlusCircle;

  isAdmin = false;

  searchPage = 0;
  page = 0;
  search: string = '';
  success: boolean;

  constructor(private _tipoMovilidad: FormBuilder, private _tipoMovilidadService: TipoMovilidadService,
    private router: Router, private _editTipoMovilidad: FormBuilder, private _tokenService: TokenService,
    private _movilidadService: MovilidadService) {
    this.tipoMovilidadForm = this._tipoMovilidad.group({
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      denominacion: ['', Validators.required]
    });
    this.editTipoMovilidadForm = this._editTipoMovilidad.group({
      id: ['', Validators.required],
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      denominacion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarTipoMovilidad();
    this.isAdmin = this._tokenService.IsAdmin();
  }

  cargarTipoMovilidad() {
    this._tipoMovilidadService.list(0).subscribe(
      data => {
        this.tipoMovilidad = data;
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
  borrarTipoMovilidad(id?: number): void {
    this.success = false;
    let flag: boolean = true;
    this._movilidadService.list(0).subscribe(
      data=>{
        this.movilidades = data;
        for(let mov of this.movilidades){
          if(mov.tipoMovilidad.id == id){
            Swal.fire({
              title: "El tipo tiene movilidades asociadas",
              icon: "error",
              showCloseButton: false,
              showConfirmButton: false
            });
            this.cargarTipoMovilidad();
            flag = false;
          }
        }
        if (flag){
          this._tipoMovilidadService.delete(id).subscribe(
            data => {
              Swal.fire({
                title: "Éxito al eliminar",
                icon: "success",
                showCloseButton: false,
                showConfirmButton: false
              });
              this.cargarTipoMovilidad();
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
      },
      err => {
        Swal.fire({
          title: "Oops! hubo un problema",
          icon: "error",
          showCloseButton: false,
          showConfirmButton: false
        });
        console.log(err);
      }
    )
  }
  onCreate(): void {
    const tipoMovilidad = new TipoMovilidad(this.tipoMovilidadForm.get('codigo')?.value, this.tipoMovilidadForm.get('denominacion')?.value);
    this._tipoMovilidadService.save(tipoMovilidad).subscribe(
      data => {
        Swal.fire({
          title: "Éxito al crear",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarTipoMovilidad();
        this.router.navigate(['/tipo-movilidad']);
      },
      err => {
        Swal.fire({
          title: "Oops! hubo un problema",
          icon: "error",
          showCloseButton: false,
          showConfirmButton: false
        })
      }
    );
  }
  cargarTipoMovilidadForUpdate(id?: number) {
    this._tipoMovilidadService.detail(id).subscribe(
      data => {
        this.newTipoMovilidad = data;
        console.log(this.newTipoMovilidad);
        this.editTipoMovilidadForm = this._editTipoMovilidad.group({
          id: [this.newTipoMovilidad.id, Validators.required],
          codigo: [this.newTipoMovilidad.codigo, [Validators.required, Validators.maxLength(10)]],
          denominacion: [this.newTipoMovilidad.denominacion, Validators.required]
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
    this.cargarTipoMovilidadForUpdate(id);
    this.testModal?.show();
  }
  onUpdate(id?:number): void{
    this.newTipoMovilidad.codigo=this.editTipoMovilidadForm.get('codigo')?.value;
    this.newTipoMovilidad.denominacion=this.editTipoMovilidadForm.get('denominacion')?.value;
    this._tipoMovilidadService.update(id,this.newTipoMovilidad).subscribe(
      data => {
        Swal.fire({
          title: "Éxito al actualizar",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarTipoMovilidad();
        this.testModal?.hide();
      },
      err => {
        Swal.fire({
          title: "Hubo un problema",
          icon: "error",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarTipoMovilidad();
        console.log(err);
      }
    );
  }


}
