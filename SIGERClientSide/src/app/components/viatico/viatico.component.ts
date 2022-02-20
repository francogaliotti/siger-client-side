import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faFileAlt, faPlusCircle, faTrash, faArrowAltCircleLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { Viatico } from 'src/app/models/viatico';
import { TokenService } from 'src/app/services/token.service';
import { ViaticoService } from 'src/app/services/viatico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viatico',
  templateUrl: './viatico.component.html',
  styleUrls: ['./viatico.component.css']
})
export class ViaticoComponent implements OnInit {

  fapluscircle = faPlusCircle;
  faEdit = faEdit;
  //faFileAlt = faFileAlt;
  faEye = faEye;
  faTrash = faTrash;
  faArrow = faArrowAltCircleLeft;

  viatico: Viatico = new Viatico('','',0);

  viaticoArray: Viatico[] = [];

  viaticoForm: FormGroup;

  editViaticoForm: FormGroup;

  success: boolean;

  modal: Modal | undefined

  @ViewChild("CreatePermission")CreatePermission: ElementRef;

  @ViewChild("EditPermission")EditPermission: ElementRef;

  isAdmin = false;

  searchPage = 0;
  page = 0;
  search: string = '';

  constructor(
    private _viatico: FormBuilder, 
    private _editViatico: FormBuilder,
    private _viaticoService: ViaticoService,
    private router: Router,
    private renderer: Renderer2,
    private _tokenService: TokenService
  ) {
    this.viaticoForm = this._viatico.group({
      codViatico: ['', [Validators.required, Validators.maxLength(10)] ],
      denominacionViatico: ['', Validators.required],
      importe: ['', Validators.required]
    });
    this.editViaticoForm = this._editViatico.group({
      id: ["",Validators.required],
      codViatico: ["", [Validators.required, Validators.maxLength(10)] ],
      denominacionViatico: ["", Validators.required],
      importe: ['', Validators.required]
    });
    
   }

  ngOnInit(): void {
    this.cargarViatico();
    this.isAdmin = this._tokenService.IsAdmin();
  }

  cargarViatico():void{
    console.log(this.searchPage);
    this._viaticoService.list(this.searchPage).subscribe(
      data => {
        this.viaticoArray = data;
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

  borrarViatico(id?:number):void{
    this._viaticoService.delete(id).subscribe(
      data => {
        Swal.fire({
          title: "Éxito al eliminar",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarViatico();
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
    const viatico = new Viatico(this.viaticoForm.get('codViatico')?.value,
    this.viaticoForm.get('denominacionViatico')?.value, this.viaticoForm.get('importe')?.value);
    
    if (this.viaticoForm.valid == true) {
    this._viaticoService.save(viatico).subscribe(
      data => {
        this.success = true;
        this.cargarViatico();

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

  openEdit(id?: number): void{
    this.modal = new bootstrap.Modal(document.getElementById('editarModal'),{
      keyboard: false
    })
    this.cargarViaticoForUpdate(id);
    this.modal?.show();
  }

  cargarViaticoForUpdate(id?: number): void {
    this._viaticoService.detail(id).subscribe(
      data => {
        this.viatico = data;
        console.log(this.viatico);
        this.editViaticoForm = this._editViatico.group({
          id: [this.viatico.id,Validators.required],
          codViatico: [this.viatico.codViatico, [Validators.required, Validators.maxLength(10)] ],
          denominacionViatico: [this.viatico.denominacionViatico, Validators.required],
          importe: [this.viatico.importe, Validators.required]
        });
      },
      err => {
        alert(err);
      }
    );
  }

  onUpdate(id?: number): void {
    this.viatico.codViatico = this.editViaticoForm.get('codViatico')?.value;
    this.viatico.denominacionViatico = this.editViaticoForm.get('denominacionViatico')?.value;
    this.viatico.importe = this.editViaticoForm.get('importe')?.value;
    this._viaticoService.update(id, this.viatico).subscribe(
      data => {
        this.cargarViatico();
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

  openDetail(id?: number): void{
    this.modal = new bootstrap.Modal(document.getElementById('detalleModal'),{
      keyboard: false
    })
    this.cargarViaticoForDetail(id);
    this.modal?.show();
  }

  cargarViaticoForDetail(id?: number): void{
    this._viaticoService.detail(id).subscribe(
      data => {
        this.viatico = data;
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

  checkViaticoForm(): void{
    if(this.viaticoForm.get('codViatico')?.valid && this.viaticoForm.get('denominacionViatico')?.valid 
    && this.viaticoForm.get('importe')?.valid){
      this.renderer.setProperty(this.CreatePermission.nativeElement, 'disabled', false);
    }else{
      this.renderer.setProperty(this.CreatePermission.nativeElement, 'disabled', true);
    }
  }

  checkEditViaticoForm(): void{
    if(this.editViaticoForm.get('codViatico')?.valid && this.editViaticoForm.get('denominacionViatico')?.valid 
    && this.editViaticoForm.get('importe')?.valid){
      this.renderer.setProperty(this.EditPermission.nativeElement, 'disabled', false);
    }else{
      this.renderer.setProperty(this.EditPermission.nativeElement, 'disabled', true);
    }
  }

  close(): void {
    this.modal.hide();
  }

}
