import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEdit, faFileAlt, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { TipoRegimenHorario } from 'src/app/models/tipo-regimen-horario';
import { TipoRegimenHorarioService } from 'src/app/services/tipo-regimen-horario.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-regimen-horario',
  templateUrl: './tipo-regimen-horario.component.html',
  styleUrls: ['./tipo-regimen-horario.component.css']
})
export class TipoRegimenHorarioComponent implements OnInit {

  fapluscircle = faPlusCircle;
  faEdit = faEdit;
  faFileAlt = faFileAlt;
  faTrash = faTrash;

  tipoRegimenHorario: TipoRegimenHorario = new TipoRegimenHorario('','');

  tipoRegimenHorarioArray: TipoRegimenHorario[] = [];

  tipoRegimenHorarioForm: FormGroup;

  editTipoRegimenHorarioForm: FormGroup;

  success: boolean;

  modal: Modal | undefined

  @ViewChild("CreatePermission")CreatePermission: ElementRef;

  @ViewChild("EditPermission")EditPermission: ElementRef;

  isAdmin = false;

  searchPage = 0;
  page = 0;
  search: string = '';

  constructor(
    private _tipoRegimenHorario: FormBuilder, 
    private _editTipoRegimenHorario: FormBuilder,
    private _tipoRegimenHorarioService: TipoRegimenHorarioService,
    private router: Router,
    private renderer: Renderer2,
    private _tokenService: TokenService
    ) {
      this.tipoRegimenHorarioForm = this._tipoRegimenHorario.group({
        codigoTipoRegimenHorario: ['', [Validators.required, Validators.maxLength(10)] ],
        denominacionTipoRegimenHorario: ['', Validators.required]
      });
      this.editTipoRegimenHorarioForm = this._editTipoRegimenHorario.group({
        id: ["",Validators.required],
        codigoTipoRegimenHorario: ["", [Validators.required, Validators.maxLength(10)] ],
        denominacionTipoRegimenHorario: ["", Validators.required]
      });
     }

  ngOnInit(): void {
    this.cargarTipoRegimenHorario();
    this.isAdmin = this._tokenService.IsAdmin();
  }

  cargarTipoRegimenHorario():void{
    this._tipoRegimenHorarioService.list(this.searchPage)
    .subscribe( data => {
        this.tipoRegimenHorarioArray = data;
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

  borrarTipoRegimenHorario(id?:number):void{
    this._tipoRegimenHorarioService.delete(id).subscribe(
      data => {
        Swal.fire({
          title: "Éxito",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarTipoRegimenHorario();
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

  onCreate():boolean{
    this.success = false;
    const tipoRegimenHorario = new TipoRegimenHorario(this.tipoRegimenHorarioForm.get('codigoTipoRegimenHorario')?.value,
    this.tipoRegimenHorarioForm.get('denominacionTipoRegimenHorario')?.value);
    
    if (this.tipoRegimenHorarioForm.valid == true) {
    this._tipoRegimenHorarioService.save(tipoRegimenHorario).subscribe(
      data => {
        this.success = true;
        this.cargarTipoRegimenHorario();
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

  open(id?: number): void{
    this.modal = new bootstrap.Modal(document.getElementById('editarModal'),{
      keyboard: false
    })
    this.cargarTipoRegimenHorarioForUpdate(id);
    this.modal?.show();
  }

  cargarTipoRegimenHorarioForUpdate(id?: number): void {
    this._tipoRegimenHorarioService.detail(id).subscribe(
      data => {
        this.tipoRegimenHorario = data;
        console.log(this.tipoRegimenHorario);
        this.editTipoRegimenHorarioForm = this._editTipoRegimenHorario.group({
          id: [this.tipoRegimenHorario.id,Validators.required],
          codigoTipoRegimenHorario: [this.tipoRegimenHorario.codigoTipoRegimenHorario, [Validators.required, Validators.maxLength(10)] ],
          denominacionTipoRegimenHorario: [this.tipoRegimenHorario.denominacionTipoRegimenHorario, Validators.required]
        });
      },
      err => {
        alert(err);
      }
    );
  }

  onUpdate(id?: number): void {
    this.tipoRegimenHorario.codigoTipoRegimenHorario = this.editTipoRegimenHorarioForm.get('codigoTipoRegimenHorario')?.value;
    this.tipoRegimenHorario.denominacionTipoRegimenHorario = this.editTipoRegimenHorarioForm.get('denominacionTipoRegimenHorario')?.value;
    this._tipoRegimenHorarioService.update(id, this.tipoRegimenHorario).subscribe(
      data => {
        Swal.fire({
          title: "Éxito",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarTipoRegimenHorario();
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

  openDetail(id?: number): void{
    this.modal = new bootstrap.Modal(document.getElementById('detalleModal'),{
      keyboard: false
    })
    this.cargarTipoRegimenHorarioForDetail(id);
    this.modal?.show();
  }

  cargarTipoRegimenHorarioForDetail(id?: number): void{
    this._tipoRegimenHorarioService.detail(id).subscribe(
      data => {
        this.tipoRegimenHorario = data;
      },
      err => {
        alert(err.error.mensaje);
        this.volver();
      }
    );
  }

  volver(): void {
    this.modal?.hide();
    this.router.navigate(['tipo-regimen-horario']);
  }

  checkTipoRegimenHorarioForm(): void{
    if(this.tipoRegimenHorarioForm.get('codigoTipoRegimenHorario')?.valid && this.tipoRegimenHorarioForm.get('denominacionTipoRegimenHorario')?.valid){
      this.renderer.setProperty(this.CreatePermission.nativeElement, 'disabled', false);
    }else{
      this.renderer.setProperty(this.CreatePermission.nativeElement, 'disabled', true);
    }
  }

  checkEditTipoRegimenHorarioForm(): void{
    if(this.editTipoRegimenHorarioForm.get('codigoTipoRegimenHorario')?.valid && this.editTipoRegimenHorarioForm.get('denominacionTipoRegimenHorario')?.valid){
      this.renderer.setProperty(this.EditPermission.nativeElement, 'disabled', false);
    }else{
      this.renderer.setProperty(this.EditPermission.nativeElement, 'disabled', true);
    }
  }

}
