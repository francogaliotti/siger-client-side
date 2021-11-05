import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEdit, faFileAlt, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import * as $ from 'jquery';
import { TipoBoletaDTO } from 'src/app/dto/tipo-boleta-dto';
import { Empleado } from 'src/app/models/empleado';
import { TipoBoleta } from 'src/app/models/tipo-boleta';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { SectorService } from 'src/app/services/sector.service';
import { TipoBoletaService } from 'src/app/services/tipo-boleta.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-view-main-tipo-boleta',
  templateUrl: './view-main-tipo-boleta.component.html',
  styleUrls: ['./view-main-tipo-boleta.component.css']
})
export class ViewMainTipoBoletaComponent implements OnInit {

  fapluscircle = faPlusCircle;
  faEdit = faEdit;
  faFileAlt = faFileAlt;
  faTrash = faTrash;

  tipoBoleta: TipoBoletaDTO = new TipoBoletaDTO("","",false,false,false,false,false);

  tipoBoletaArray: TipoBoletaDTO[] = [];

  tipoBoletaForm: FormGroup;

  editTipoBoletaForm: FormGroup;

  success: boolean;

  modal: Modal | undefined

  @ViewChild("CreatePermission")CreatePermission: ElementRef;

  @ViewChild("EditPermission")EditPermission: ElementRef;

  roles: string[];
  isAdmin = false;

  constructor(
    private _tipoBoleta: FormBuilder,
    private _editTipoBoleta: FormBuilder,
    private _tipoBoletaService: TipoBoletaService,
    private _sectorService: SectorService,
    private _empleadoService: EmpleadoService,
    private router: Router,
    private renderer: Renderer2,
    private _tokenService: TokenService
  ) {
    this.tipoBoletaForm = this._tipoBoleta.group({
      codigo: ['', [Validators.required, Validators.maxLength(10)] ],
      tipoBoletaDenominacion: ['', Validators.required]
    });
    this.editTipoBoletaForm = this._editTipoBoleta.group({
      id: ["",Validators.required],
      codigo: ["", [Validators.required, Validators.maxLength(10)] ],
      tipoBoletaDenominacion: ["", Validators.required]
    });
   }

  ngOnInit(): void {
    this.cargarEstadoBoleta();
    this.isAdmin = this._tokenService.IsAdmin();
  }

  cargarEstadoBoleta():void{
    this.tipoBoletaArray = null;
    this._tipoBoletaService.list().subscribe(
      data => {
        this.tipoBoletaArray = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrarEstadoBoleta(id?:number):void{
    this._tipoBoletaService.delete(id).subscribe(
      data => {
        alert('Se ha eliminado el Tipo de Boleta satisfactoriamente')
        this.cargarEstadoBoleta();
      },
      err => {
        alert(err.error.mensaje);
      }
    );
  }

  onCreate():boolean{
    this.success = false;
    const tipoBoleta = new TipoBoletaDTO(this.tipoBoletaForm.get('codigo')?.value,
    this.tipoBoletaForm.get('tipoBoletaDenominacion')?.value,
    this.tipoBoletaForm.get('tieneMovilidad')?.value,
    this.tipoBoletaForm.get('tieneZonaInhospita')?.value,
    this.tipoBoletaForm.get('tieneViatico')?.value,
    this.tipoBoletaForm.get('permiteNoFichadaRetorno')?.value,
    this.tipoBoletaForm.get('permiteNoFichadaSalida')?.value);
    
    if (this.tipoBoletaForm.valid == true) {
    this._tipoBoletaService.save(tipoBoleta).subscribe(
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
    this._tipoBoletaService.detail(id).subscribe(
      data => {
        this.tipoBoleta = data;
        console.log(this.tipoBoleta);
        this.editTipoBoletaForm = this._editTipoBoleta.group({
          id: [this.tipoBoleta.id,Validators.required],
          codEstadoBoleta: [this.tipoBoleta.codigo, [Validators.required, Validators.maxLength(10)] ],
          nombreEstadoBoleta: [this.tipoBoleta.tipoBoletaDenominacion, Validators.required]
        });
      },
      err => {
        alert(err);
      }
    );
  }

  onUpdate(id?: number): void {
    this.tipoBoleta.codigo = this.editTipoBoletaForm.get('codigo')?.value;
    this.tipoBoleta.tipoBoletaDenominacion = this.editTipoBoletaForm.get('tipoBoletaDenominacion')?.value;
    this._tipoBoletaService.update(id, this.tipoBoleta).subscribe(
      data => {
        alert('Tipo de Boleta actualizado Satisfactoriamente');
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
    this._tipoBoletaService.detail(id).subscribe(
      data => {
        this.tipoBoleta = data;
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
    if(this.tipoBoletaForm.get('codEstadoBoleta')?.valid && this.tipoBoletaForm.get('nombreEstadoBoleta')?.valid){
      this.renderer.setProperty(this.CreatePermission.nativeElement, 'disabled', false);
    }else{
      this.renderer.setProperty(this.CreatePermission.nativeElement, 'disabled', true);
    }
  }

  checkEditEstadoBoletaForm(): void{
    if(this.editTipoBoletaForm.get('codEstadoBoleta')?.valid && this.editTipoBoletaForm.get('nombreEstadoBoleta')?.valid){
      this.renderer.setProperty(this.EditPermission.nativeElement, 'disabled', false);
    }else{
      this.renderer.setProperty(this.EditPermission.nativeElement, 'disabled', true);
    }
  }

}
