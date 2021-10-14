import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Modal} from 'bootstrap';
import { faEdit, faFileAlt, faGrinTongueSquint, faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import * as bootstrap from 'bootstrap';
import { ZonaInhospita } from 'src/app/models/zona-inhospita';
import { ZonaInhospitaService } from 'src/app/services/zona-inhospita.service';

@Component({
  selector: 'app-zona-inhospita',
  templateUrl: './zona-inhospita.component.html',
  styleUrls: ['./zona-inhospita.component.css']
})
export class ZonaInhospitaComponent implements OnInit {

  zonaInhospita: ZonaInhospita[] = [];
  zonaInhospitaForm: FormGroup;
  newZona: ZonaInhospita = new ZonaInhospita('','',0);
  editZonaForm: FormGroup;
  testModal: Modal | undefined;
  faEdit = faEdit;
  faTrash = faTrash;
  faPlusCircle = faPlusCircle;

  constructor(private _zona: FormBuilder,private _zonaInhospitaService:ZonaInhospitaService, 
    private router: Router, private _editzona:FormBuilder) {
    this.zonaInhospitaForm = this._zona.group({
      codZona: ['', [Validators.required, Validators.maxLength(10)]],
      denominacionZona: ['', Validators.required],
      precio: ['', Validators.required]
    });
    this.editZonaForm = this._editzona.group({
      codZona: ['', [Validators.required, Validators.maxLength(10)]],
      denominacionZona: ['', Validators.required],
      precio: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarZonaInhospita();
  }

  cargarZonaInhospita():void{
    this._zonaInhospitaService.list().subscribe(
      data => {
        this.zonaInhospita = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  borrarZona(id?:number):void{
    this._zonaInhospitaService.delete(id).subscribe(
      data => {
        alert('Se ha eliminado la zona satisfactoriamente')
        this.cargarZonaInhospita();
      },
      err => {
        alert(err.error.mensaje);
      }
    );
  }
  onCreate():void{
    const zonaInhospita = new ZonaInhospita(this.zonaInhospitaForm.get('codZona')?.value,
    this.zonaInhospitaForm.get('denominacionZona')?.value, this.zonaInhospitaForm.get('precio')?.value);
    this._zonaInhospitaService.save(zonaInhospita).subscribe(
      data => {
        alert('Zona Inhóspita creada Satisfactoriamente');
        this.cargarZonaInhospita();
        this.router.navigate(['/zonaInhospita']);
      },
      err => {
        alert(err.console.mensaje);
        this.router.navigate(['/estadoLicencia']);
      }
    );
  }
  open(id?:number):void{

  }
  onUpdate(id?: number): void {
    this.newZona.codZona = this.editZonaForm.get('codZona')?.value;
    this.newZona.denominacionZona = this.editZonaForm.get('denominacionZona')?.value;
    this.newZona.precio = this.editZonaForm.get('precio')?.value;
    this._zonaInhospitaService.update(id, this.newZona).subscribe(
      data => {
        alert('Estado de Licencia actualizado Satisfactoriamente');
        this.cargarZonaInhospita();
        this.testModal?.hide();
      },
      err => {
        alert(err);
      }
    );

  }

}
