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
  newTipoLicencia: TipoLicenciaDTO = new TipoLicenciaDTO("", "", false, 0, false, "", 0, "", [], []);
  sectorArray: Sector[] = [];
  empleadoArray: Empleado[] = [];
  nivelesAutorizacionArray: number[] = [0, 1, 2, 3, 4];
  success: boolean;

  faEdit = faEdit;
  faTrash = faTrash;
  faArrow = faArrowAltCircleLeft;
  faPlusCircle = faPlusCircle;
  faEye = faEye;

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
      limiteRangoDias: [0],
      observaciones: [""],
      goceSueldo: [false],
      tipoRequerimientoCantNiveles: [0],
      tipoRequerimientoDenominacion: [""],
      tipoRequerimientoAprueban: [[]],
      tipoRequerimientoAprobadores: [[]]
    });
    this.editTipoLicenciaForm = this._editTipoLicencia.group({
      id: ['', Validators.required],
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      denominacion: ['', Validators.required],
      justificaPresentismo: [false],
      limiteRangoDias: [0],
      observaciones: [""],
      goceSueldo: [false],
      tipoRequerimientoCantNiveles: [0],
      tipoRequerimientoDenominacion: [""],
      tipoRequerimientoAprueban: [[]],
      tipoRequerimientoAprobadores: [[]]
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
    if (this.page > 0)
      this.page -= 10;
    this.searchPage = this.searchPage - 1;
  }

  onSearch(search: string) {
    this.page = 0;
    this.search = search;
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
        Swal.fire({
          title: "Oops! hubo un problema",
          icon: "error",
          showCloseButton: false,
          showConfirmButton: false
        });
      }
    );
  }
  onCreate(): boolean {
    this.success = false;
    const tipoLicencia = new TipoLicenciaDTO(
      this.tipoLicenciaForm.get('codigo')?.value,
      this.tipoLicenciaForm.get('denominacion')?.value,
      this.tipoLicenciaForm.get('justificaPresentismo')?.value,
      this.tipoLicenciaForm.get('limiteRangoDias')?.value,
      this.tipoLicenciaForm.get('goceSueldo')?.value,
      this.tipoLicenciaForm.get('observaciones')?.value,
      this.tipoLicenciaForm.get('tipoRequerimientoCantNiveles')?.value,
      this.tipoLicenciaForm.get('tipoRequerimientoDenominacion')?.value,
      this.tipoLicenciaForm.get('tipoRequerimientoAprueban')?.value,
      this.tipoLicenciaForm.get('tipoRequerimientoAprobadores')?.value);
    if (this.tipoLicenciaForm.valid == true) {
      console.log(tipoLicencia);
      this._tipoLicenciaService.save(tipoLicencia).subscribe(
        data => {
          this.success = true;
          Swal.fire({
            title: "Éxito al crear",
            icon: "success",
            showCloseButton: false,
            showConfirmButton: false
          });
          this.cargarTipoLicencia();
          this.router.navigate(['/tipo-licencia']);
        },
        err => {
          Swal.fire({
            title: "Oops! hubo un problema",
            icon: "error",
            showCloseButton: false,
            showConfirmButton: false
          })
        }
      );
    }
    return this.success;
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
        const admins: Empleado[] = [];
        for (let e of data) {
          if (e.usuario != null) {
            for (let r of e.usuario.roles) {
              if (r.id != null) {
                if (r.id == 2) {
                  admins.push(e);
                }
              }
            }
          }
        }
        this.empleadoArray = admins;
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
          denominacion: [this.newTipoLicencia.denominacion, Validators.required],
          justificaPresentismo: [this.newTipoLicencia.justificaPresentismo],
          limiteRangoDias: [this.newTipoLicencia.limiteRangoDias],
          observaciones: [this.newTipoLicencia.observaciones],
          goceSueldo: [this.newTipoLicencia.goceSueldo],
          tipoRequerimientoCantNiveles: [this.newTipoLicencia.tipoRequerimientoCantNiveles],
          tipoRequerimientoDenominacion: [this.newTipoLicencia.tipoRequerimientoDenominacion],
          tipoRequerimientoAprueban: [this.newTipoLicencia.tipoRequerimientoAprueban],
          tipoRequerimientoAprobadores: [this.newTipoLicencia.tipoRequerimientoAprobadores]
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
    this.newTipoLicencia.observaciones = this.editTipoLicenciaForm.get('observaciones')?.value;
    this.newTipoLicencia.justificaPresentismo = this.editTipoLicenciaForm.get('justificaPresentismo')?.value;
    this.newTipoLicencia.tipoRequerimientoAprobadores = this.editTipoLicenciaForm.get('tipoRequerimientoAprobadores')?.value;
    this.newTipoLicencia.tipoRequerimientoAprueban = this.editTipoLicenciaForm.get('tipoRequerimientoAprueban')?.value;
    this.newTipoLicencia.limiteRangoDias = this.editTipoLicenciaForm.get('limiteRangoDias')?.value;
    this.newTipoLicencia.goceSueldo = this.editTipoLicenciaForm.get('goceSueldo')?.value;
    this.newTipoLicencia.tipoRequerimientoCantNiveles = this.editTipoLicenciaForm.get('tipoRequerimientoCantNiveles')?.value;
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
        Swal.fire({
          title: "Oops! hubo un problema",
          icon: "error",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarTipoLicencia();
        this.testModal?.hide();
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
    this.router.navigate(['tipo-licencia']);
  }


}
