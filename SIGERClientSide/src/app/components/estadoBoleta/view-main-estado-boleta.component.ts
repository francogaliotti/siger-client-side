import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadoBoleta } from 'src/app/models/estado-boleta';
import { EstadoBoletasService } from 'src/app/services/estado-boletas.service';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { faEdit, faFileAlt, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-main',
  templateUrl: './view-main-estado-boleta.component.html',
  styleUrls: ['./view-main-estado-boleta.component.css']
})
export class ViewMainEstadoBoletaComponent implements OnInit {

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

  constructor(
    private _estadoBoleta: FormBuilder, 
    private _editEstadoBoleta: FormBuilder,
    private _estadoBoletaService: EstadoBoletasService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2
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
  }

  cargarEstadoBoleta():void{
    this.estadoBoletaArray = null;
    this._estadoBoletaService.list().subscribe(
      data => {
        this.estadoBoletaArray = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrarEstadoBoleta(id?:number):void{
    this._estadoBoletaService.delete(id).subscribe(
      data => {
        alert('Se ha eliminado el Estado de Boleta satisfactoriamente')
        this.cargarEstadoBoleta();
      },
      err => {
        alert(err.error.mensaje);
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
      },
      err => {
        alert(err.console.mensaje);
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
        alert('Estado de Boleta actualizado Satisfactoriamente');
        this.cargarEstadoBoleta();
        this.modal?.hide();
      },
      err => {
        alert(err);
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
    this.router.navigate(['estadoBoleta']);
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
