import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEdit, faFileAlt, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { EstadoBoleta } from 'src/app/models/estado-boleta';
import { EstadoBoletaService } from 'src/app/services/estado-boleta.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estado-boleta',
  templateUrl: './estado-boleta.component.html',
  styleUrls: ['./estado-boleta.component.css']
})
export class EstadoBoletaComponent implements OnInit {

  fapluscircle = faPlusCircle;
  faEdit = faEdit;
  faFileAlt = faFileAlt;
  faTrash = faTrash;

  estadoBoleta: EstadoBoleta = new EstadoBoleta('','');

  estadoBoletaArray: EstadoBoleta[] = [];

  estadoBoletaForm: FormGroup;

  editEstadoBoletaForm: FormGroup;

  success: boolean;

  modal: Modal | undefined

  @ViewChild("CreatePermission")CreatePermission: ElementRef;

  @ViewChild("EditPermission")EditPermission: ElementRef;

  isAdmin = false;

  searchPage = 0;
  page = 0;
  search: string = '';

  constructor(
    private _estadoBoleta: FormBuilder, 
    private _editEstadoBoleta: FormBuilder,
    private _estadoBoletaService: EstadoBoletaService,
    private router: Router,
    private renderer: Renderer2,
    private _tokenService: TokenService
    ) {
      this.estadoBoletaForm = this._estadoBoleta.group({
        codEstadoBoleta: ['', [Validators.required, Validators.maxLength(10)] ],
        nombreEstadoBoleta: ['', Validators.required]
      });
      this.editEstadoBoletaForm = this._editEstadoBoleta.group({
        id: ["",Validators.required],
        codEstadoBoleta: ["", [Validators.required, Validators.maxLength(10)] ],
        nombreEstadoBoleta: ["", Validators.required]
      });
     }

  ngOnInit(): void {
    this.cargarEstadoBoleta();
    this.isAdmin = this._tokenService.IsAdmin();
  }

  cargarEstadoBoleta():void{
    this._estadoBoletaService.list(this.searchPage)
    .subscribe( data => {
        this.estadoBoletaArray = data;
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

  borrarEstadoBoleta(id?:number):void{
    this._estadoBoletaService.delete(id).subscribe(
      data => {
        Swal.fire({
          title: "Éxito",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarEstadoBoleta();
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
    const estadoBoleta = new EstadoBoleta(this.estadoBoletaForm.get('codEstadoBoleta')?.value,
    this.estadoBoletaForm.get('nombreEstadoBoleta')?.value);
    
    if (this.estadoBoletaForm.valid == true) {
    this._estadoBoletaService.save(estadoBoleta).subscribe(
      data => {
        this.success = true;
        this.cargarEstadoBoleta();
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
    this.cargarEstadoBoletaForUpdate(id);
    this.modal?.show();
  }

  cargarEstadoBoletaForUpdate(id?: number): void {
    this._estadoBoletaService.detail(id).subscribe(
      data => {
        this.estadoBoleta = data;
        console.log(this.estadoBoleta);
        this.editEstadoBoletaForm = this._editEstadoBoleta.group({
          id: [this.estadoBoleta.id,Validators.required],
          codEstadoBoleta: [this.estadoBoleta.codEstadoBoleta, [Validators.required, Validators.maxLength(10)] ],
          nombreEstadoBoleta: [this.estadoBoleta.nombreEstadoBoleta, Validators.required]
        });
      },
      err => {
        alert(err);
      }
    );
  }

  onUpdate(id?: number): void {
    this.estadoBoleta.codEstadoBoleta = this.editEstadoBoletaForm.get('codEstadoBoleta')?.value;
    this.estadoBoleta.nombreEstadoBoleta = this.editEstadoBoletaForm.get('nombreEstadoBoleta')?.value;
    this._estadoBoletaService.update(id, this.estadoBoleta).subscribe(
      data => {
        Swal.fire({
          title: "Éxito",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarEstadoBoleta();
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
    this.cargarEstadoBoletaForDetail(id);
    this.modal?.show();
  }

  cargarEstadoBoletaForDetail(id?: number): void{
    this._estadoBoletaService.detail(id).subscribe(
      data => {
        this.estadoBoleta = data;
      },
      err => {
        alert(err.error.mensaje);
        this.volver();
      }
    );
  }

  volver(): void {
    this.modal?.hide();
    this.router.navigate(['estado-boleta']);
  }

  checkEstadoBoletaForm(): void{
    if(this.estadoBoletaForm.get('codEstadoBoleta')?.valid && this.estadoBoletaForm.get('nombreEstadoBoleta')?.valid){
      this.renderer.setProperty(this.CreatePermission.nativeElement, 'disabled', false);
    }else{
      this.renderer.setProperty(this.CreatePermission.nativeElement, 'disabled', true);
    }
  }

  checkEditEstadoBoletaForm(): void{
    if(this.editEstadoBoletaForm.get('codEstadoBoleta')?.valid && this.editEstadoBoletaForm.get('nombreEstadoBoleta')?.valid){
      this.renderer.setProperty(this.EditPermission.nativeElement, 'disabled', false);
    }else{
      this.renderer.setProperty(this.EditPermission.nativeElement, 'disabled', true);
    }
  }

}
