import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEdit, faFileAlt, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { TipoSector } from 'src/app/models/tipo-sector';
import { TipoSectorService } from 'src/app/services/tipo-sector.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-sector',
  templateUrl: './tipo-sector.component.html',
  styleUrls: ['./tipo-sector.component.css']
})
export class TipoSectorComponent implements OnInit {

  fapluscircle = faPlusCircle;
  faEdit = faEdit;
  faFileAlt = faFileAlt;
  faTrash = faTrash;

  tipoSector: TipoSector = new TipoSector('','');

  tipoSectorArray: TipoSector[] = [];

  tipoSectorForm: FormGroup;

  editTipoSectorForm: FormGroup;

  success: boolean;

  modal: Modal | undefined

  @ViewChild("CreatePermission")CreatePermission: ElementRef;

  @ViewChild("EditPermission")EditPermission: ElementRef;

  isAdmin = false;

  searchPage = 0;
  page = 0;
  search: string = '';

  constructor(
    private _tipoSector: FormBuilder, 
    private _editTipoSector: FormBuilder,
    private _tipoSectorService: TipoSectorService,
    private router: Router,
    private renderer: Renderer2,
    private _tokenService: TokenService
    ) {
      this.tipoSectorForm = this._tipoSector.group({
        codTipoSector: ['', [Validators.required, Validators.maxLength(10)] ],
        nombreTipoSector: ['', Validators.required]
      });
      this.editTipoSectorForm = this._editTipoSector.group({
        id: ["",Validators.required],
        codTipoSector: ["", [Validators.required, Validators.maxLength(10)] ],
        nombreTipoSector: ["", Validators.required]
      });
     }

  ngOnInit(): void {
    this.cargarTipoSector();
    this.isAdmin = this._tokenService.IsAdmin();
  }

  cargarTipoSector():void{
    this._tipoSectorService.list(this.searchPage)
    .subscribe( data => {
        this.tipoSectorArray = data;
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

  borrarTipoSector(id?:number):void{
    this._tipoSectorService.delete(id).subscribe(
      data => {
        Swal.fire({
          title: "Éxito",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarTipoSector();
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
    const tipoSector = new TipoSector(this.tipoSectorForm.get('codTipoSector')?.value,
    this.tipoSectorForm.get('nombreTipoSector')?.value);
    
    if (this.tipoSectorForm.valid == true) {
    this._tipoSectorService.save(tipoSector).subscribe(
      data => {
        this.success = true;
        this.cargarTipoSector();
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
    this.cargarTipoSectorForUpdate(id);
    this.modal?.show();
  }

  cargarTipoSectorForUpdate(id?: number): void {
    this._tipoSectorService.detail(id).subscribe(
      data => {
        this.tipoSector = data;
        console.log(this.tipoSector);
        this.editTipoSectorForm = this._editTipoSector.group({
          id: [this.tipoSector.id,Validators.required],
          codTipoSector: [this.tipoSector.codTipoSector, [Validators.required, Validators.maxLength(10)] ],
          nombreTipoSector: [this.tipoSector.nombreTipoSector, Validators.required]
        });
      },
      err => {
        alert(err);
      }
    );
  }

  onUpdate(id?: number): void {
    this.tipoSector.codTipoSector = this.editTipoSectorForm.get('codTipoSector')?.value;
    this.tipoSector.nombreTipoSector = this.editTipoSectorForm.get('nombreTipoSector')?.value;
    this._tipoSectorService.update(id, this.tipoSector).subscribe(
      data => {
        Swal.fire({
          title: "Éxito",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarTipoSector();
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
    this.cargarTipoSectorForDetail(id);
    this.modal?.show();
  }

  cargarTipoSectorForDetail(id?: number): void{
    this._tipoSectorService.detail(id).subscribe(
      data => {
        this.tipoSector = data;
      },
      err => {
        alert(err.error.mensaje);
        this.volver();
      }
    );
  }

  volver(): void {
    this.modal?.hide();
    this.router.navigate(['tipo-sector']);
  }

  checkTipoSectorForm(): void{
    if(this.tipoSectorForm.get('codTipoSector')?.valid && this.tipoSectorForm.get('nombreTipoSector')?.valid){
      this.renderer.setProperty(this.CreatePermission.nativeElement, 'disabled', false);
    }else{
      this.renderer.setProperty(this.CreatePermission.nativeElement, 'disabled', true);
    }
  }

  checkEditTipoSectorForm(): void{
    if(this.editTipoSectorForm.get('codTipoSector')?.valid && this.editTipoSectorForm.get('nombreTipoSector')?.valid){
      this.renderer.setProperty(this.EditPermission.nativeElement, 'disabled', false);
    }else{
      this.renderer.setProperty(this.EditPermission.nativeElement, 'disabled', true);
    }
  }

}
