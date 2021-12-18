import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Modal } from 'bootstrap';
import { faEye, faArrowAltCircleDown, faEdit, faFileAlt, faPlusCircle, faTrash, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
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
import Swal from 'sweetalert2';

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
  modal: Modal | undefined;
  newTipoLicencia: TipoLicenciaDTO = new TipoLicenciaDTO('','',false,'','',0,'','','','',0,'');
  sectorArray: Sector[] = [];
  empleadoArray: Empleado[] = [];
  nivelesAutorizacionArray: number[]=[0,1,2,3,4];

  faEdit = faEdit;
  faTrash = faTrash;
  faArrow= faArrowAltCircleLeft;
  faPlusCircle = faPlusCircle;
  faEye = faEye;

  roles: string[];
  isAdmin = false;
 


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
    this._tipoLicenciaService.list().subscribe(
      data => {
        this.tipoLicencia = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrarTipoLicencia(id?: number): void {
    this._tipoLicenciaService.delete(id).subscribe(
      data => {
        Swal.fire({
          title: "Éxito al eliminar",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
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
        Swal.fire({
          title: "Éxito al crear",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarTipoLicencia();
        this.router.navigate(['/tipoLicencia']);
      },
      err => {
        alert(err.console.mensaje);
        this.router.navigate(['/tipoLicencia']);
      }
    );
  }
  SectoresList(): void {
    this._sectorService.list().subscribe(
      data => {
        this.sectorArray = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  EmpleadosList(): void {
    this._empleadoService.list().subscribe(
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
        Swal.fire({
          title: "Éxito al actualizar",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarTipoLicencia();
        this.testModal?.hide();
      },
      err => {
        alert(err);
      }
    );

  }
  openDetail(id?: number): void {
    this.modal = new bootstrap.Modal(document.getElementById('detalleModal'), {
      keyboard: false
    })
    this.cargarTipoBoletaForDetail(id);
    this.modal?.show();
  }
  cargarTipoBoletaForDetail(id?: number): void {
    this._tipoLicenciaService.detail(id).subscribe(
      data => {
        this.newTipoLicencia = data;
      },
      err => {
        alert(err.error.mensaje);
        this.volver();
      }
    );
  }
  volver(): void {
    this.modal?.hide();
    this.router.navigate(['tipoLicencia']);
  }
  

}
