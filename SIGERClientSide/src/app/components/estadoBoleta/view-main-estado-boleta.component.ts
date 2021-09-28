import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadoBoleta } from 'src/app/models/estado-boleta';
import { EstadoBoletasService } from 'src/app/services/estado-boletas.service';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-view-main',
  templateUrl: './view-main-estado-boleta.component.html',
  styleUrls: ['./view-main-estado-boleta.component.css']
})
export class ViewMainEstadoBoletaComponent implements OnInit {

  estadoBoleta: EstadoBoleta = new EstadoBoleta('','');

  estadoBoletaArray: EstadoBoleta[] = [];

  estadoBoletaForm: FormGroup;

  editEstadoBoletaForm: FormGroup;

  submitted: Boolean;

  modal: Modal | undefined

  constructor(
    private _estadoBoleta: FormBuilder, 
    private _editEstadoBoleta: FormBuilder,
    private _estadoBoletaService: EstadoBoletasService, 
    private activatedRoute: ActivatedRoute,
    private router: Router
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

  onCreate():void{
    this.submitted = true;
    const estadoBoleta = new EstadoBoleta(this.estadoBoletaForm.get('codEstadoBoleta')?.value,
    this.estadoBoletaForm.get('nombreEstadoBoleta')?.value);
    if(!this.estadoBoletaForm.valid){
      return;
    }
    this._estadoBoletaService.save(estadoBoleta).subscribe(
      data => {
        alert('Estado de Boleta creado Satisfactoriamente');
        this.cargarEstadoBoleta();
      },
      err => {
        alert(err.console.mensaje);
      }
    );
    
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

}
