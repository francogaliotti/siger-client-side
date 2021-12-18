import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Modal } from 'bootstrap';
import { faEdit, faFileAlt, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as bootstrap from 'bootstrap';
import { TokenService } from 'src/app/services/token.service';
import { TipoLicencia } from 'src/app/models/tipo-licencia';
import { TipoLicenciaService } from 'src/app/services/tipo-licencia.service';
import { TipoLicenciaDTO } from 'src/app/dto/tipoLicenciaDTO';
import * as $ from 'jquery';
import { Sector } from 'src/app/models/sector';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { SectorService } from 'src/app/services/sector.service';

@Component({
  selector: 'tipo-licencia',
  templateUrl: './tipo-licencia.component.html',
  styleUrls: ['./tipo-licencia.component.css']
})
export class TipoLicenciaComponent implements OnInit {

  tipoLicencia: TipoLicenciaDTO[] = [];
  tipoLicenciaForm: FormGroup;
  editTipoLicenciaForm: FormGroup;
  testModal: Modal | undefined;
  newTipoLicencia: TipoLicenciaDTO = new TipoLicenciaDTO('','',false,'','',0,'','','','',0,'');
  sectorArray: Sector[] = [];
  empleadoArray: Empleado[] = [];
  nivelesAutorizacionArray: number[]=[0,1,2,3,4];

  faEdit = faEdit;
  faTrash = faTrash;
  faPlusCircle = faPlusCircle;

  isAdmin = false;

  searchPage = 0;
  page = 0;
  search: string = '';

  constructor(private _tipoLicencia: FormBuilder, private _tipoLicenciaService: TipoLicenciaService,
    private router: Router, private _editTipoLicencia: FormBuilder, private _tokenService: TokenService,
    private _empleadoService: EmpleadoService, private _sectorService: SectorService) {
    this.tipoLicenciaForm = this._tipoLicencia.group({
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      denominacion: ['', Validators.required],
      justificaPresentismo: [false],
      generaRequerimiento: [""],
      justificaRequerimiento: [""],
      limiteRangoDias:[0],
      modalidadLicencia: [""],
      observaciones: [""],
	    permiteSolapamiento:[""],
      tipoCalculo: [""],
      tipoRequerimientoCantNiveles: [0],
      tipoRequerimientoDenominacion: [""]
    });
    this.editTipoLicenciaForm = this._editTipoLicencia.group({
      id: ['', Validators.required],
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      denominacion: ['', Validators.required],
      justificaPresentismo: [false],
      generaRequerimiento: [""],
      justificaRequerimiento: [""],
      limiteRangoDias:[0],
      modalidadLicencia: [""],
      observaciones: [""],
	    permiteSolapamiento:[""],
      tipoCalculo: [""],
      tipoRequerimientoCantNiveles: [0],
      tipoRequerimientoDenominacion: [""]
    });
  }


  ngOnInit(): void {
    this.cargarTipoLicencia();
    this.SectoresList();
    this.EmpleadosList();
    this.isAdmin = this._tokenService.IsAdmin();
    
  }

  cargarTipoLicencia(): void {
    this._tipoLicenciaService.list(this.searchPage).subscribe(
      data => {
        this.tipoLicencia = data;
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

  borrarTipoLicencia(id?: number): void {
    this._tipoLicenciaService.delete(id).subscribe(
      data => {
        alert('Se ha eliminado el Tipo de Licencia satisfactoriamente')
        this.cargarTipoLicencia();
      },
      err => {
        alert(err.error.mensaje);
      }
    );
  }
  onCreate(): void {
    const tipoLicencia = new TipoLicenciaDTO(
      this.tipoLicenciaForm.get('codigo')?.value,
      this.tipoLicenciaForm.get('denominacion')?.value,
      this.tipoLicenciaForm.get('justificaPresentismo')?.value,
      this.tipoLicenciaForm.get('generaRequerimiento')?.value,
      this.tipoLicenciaForm.get('justificaRequerimiento')?.value,
      this.tipoLicenciaForm.get('limiteRangoDias')?.value,
      this.tipoLicenciaForm.get('modalidadLicencia')?.value,
      this.tipoLicenciaForm.get('observaciones')?.value,
      this.tipoLicenciaForm.get('permiteSolapamiento')?.value,
      this.tipoLicenciaForm.get('tipoCalculo')?.value,
      this.tipoLicenciaForm.get('tipoRequerimientoCantNiveles')?.value,
      this.tipoLicenciaForm.get('tipoRequerimientoDenominacion')?.value);
      
    this._tipoLicenciaService.save(tipoLicencia).subscribe(
      data => {
        alert('Tipo de Licencia creado Satisfactoriamente');
        this.cargarTipoLicencia();
        this.router.navigate(['/tipo-licencia']);
      },
      err => {
        alert(err.console.mensaje);
        this.router.navigate(['/tipo-licencia']);
      }
    );
  }
  SectoresList(): void {
    this._sectorService.list(this.searchPage).subscribe(
      data => {
        this.sectorArray = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  EmpleadosList(): void {
    this._empleadoService.list(this.searchPage).subscribe(
      data => {
        this.empleadoArray = data;
      },
      err => {
        console.log(err);
      }
    );
  }


  open(id?: number): void {
    this.testModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
      keyboard: false
    })
    this.cargarTipoLicenciaForUpdate(id);
    this.testModal?.show();
  }


  cargarTipoLicenciaForUpdate(id?: number): void {
    this._tipoLicenciaService.detail(id).subscribe(
      data => {
        this.newTipoLicencia = data;
        console.log(this.newTipoLicencia);
        this.editTipoLicenciaForm = this._editTipoLicencia.group({
          id: [this.newTipoLicencia.id, Validators.required],
          codigo: [this.newTipoLicencia.codigo, [Validators.required, Validators.maxLength(10)]],
          denominacion: [this.newTipoLicencia.denominacion, Validators.required]
        });
      },
      err => {
        alert(err);
      }
    );
  }

  onUpdate(id?: number): void {
    this.newTipoLicencia.codigo = this.editTipoLicenciaForm.get('codigo')?.value;
    this.newTipoLicencia.denominacion = this.editTipoLicenciaForm.get('denominacion')?.value;
    this._tipoLicenciaService.update(id, this.newTipoLicencia).subscribe(
      data => {
        alert('Tipo de Licencia actualizado Satisfactoriamente');
        this.cargarTipoLicencia();
        this.testModal?.hide();
      },
      err => {
        alert(err);
      }
    );

  }

}
