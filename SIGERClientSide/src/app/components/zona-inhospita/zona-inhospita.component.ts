import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Modal} from 'bootstrap';
import { faEdit, faFileAlt, faGrinTongueSquint, faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import * as bootstrap from 'bootstrap';
import { ZonaInhospita } from 'src/app/models/zona-inhospita';
import { ZonaInhospitaService } from 'src/app/services/zona-inhospita.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

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

  roles: string[];
  isAdmin = false;

  constructor(private _zona: FormBuilder,private _zonaInhospitaService:ZonaInhospitaService, 
    private router: Router, private _editzona:FormBuilder, private _tokenService: TokenService) {
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
    this.isAdmin = this._tokenService.IsAdmin();
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
        Swal.fire({
          title: "Éxito al eliminar",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
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
        Swal.fire({
          title: "Éxito al crear",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
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
    this.testModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
      keyboard: false
    })
    this.cargarZonaInhospitaForUpdate(id);
    this.testModal?.show();
  }

  cargarZonaInhospitaForUpdate(id?:number): void{
    this._zonaInhospitaService.detail(id).subscribe(
      data=>{
        this.newZona=data;
        console.log(this.newZona);
        this.editZonaForm = this._editzona.group({
          id: [this.newZona.id, Validators.required],
          codZona:[this.newZona.codZona,[Validators.required, Validators.maxLength(10)]],
          denominacionZona: [this.newZona.denominacionZona, Validators.required],
          precio: [this.newZona.precio, Validators.required]
        });
      },
      err=>{
        alert(err);
      }
    );
  }

  onUpdate(id?: number): void {
    this.newZona.codZona = this.editZonaForm.get('codZona')?.value;
    this.newZona.denominacionZona = this.editZonaForm.get('denominacionZona')?.value;
    this.newZona.precio = this.editZonaForm.get('precio')?.value;
    this._zonaInhospitaService.update(id, this.newZona).subscribe(
      data => {
        Swal.fire({
          title: "Éxito al actualizar",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarZonaInhospita();
        this.testModal?.hide();
      },
      err => {
        alert(err);
      }
    );

  }

}
