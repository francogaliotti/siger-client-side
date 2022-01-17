import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { faEye, faArrowAltCircleDown, faEdit, faFileAlt, faPlusCircle, faTrash, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import * as bootstrap from 'bootstrap';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';
import { Licencia } from 'src/app/models/licencia';
import { LicenciaService } from 'src/app/services/licencia.service';
import { TipoLicencia } from 'src/app/models/tipo-licencia';
import { TipoLicenciaService } from 'src/app/services/tipo-licencia.service';
import { TipoLicenciaDTO } from 'src/app/dto/tipoLicenciaDTO';

@Component({
  selector: 'app-solicitar-licencia',
  templateUrl: './solicitar-licencia.component.html',
  styleUrls: ['./solicitar-licencia.component.css']
})
export class SolicitarLicenciaComponent implements OnInit {

  tipoLicenciaArray: TipoLicenciaDTO[] = [];
  licenciaArray: Licencia[] = [];
  licenciaForm: FormGroup;
  editLicenciaForm: FormGroup;
  testModal: Modal | undefined;
  modal: Modal | undefined;
  newLicencia: Licencia = new Licencia();
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

  constructor(private _licencia: FormBuilder, private _licenciaService: LicenciaService,
    private router: Router, private _editLicencia: FormBuilder, private _tokenService: TokenService, private _tipoLicenciaService: TipoLicenciaService) {
    this.licenciaForm = this._licencia.group({
      fechaAlta: [],
      fechaBaja: [],
      fechaInicioLicencia: [],
      fechaFinLicencia: [],
      fechaFrancoCompensatorio: [],
      fechaCierre: [],
      fechaControl: [],
      fechaSincronizacion: [],
      observacionesLicencia: [""],
      comentarios: [[]],
      documentosAdjuntosLicencia: [[]],
      tipoLicencia: [],
      fechasCambiEstadoLicencia: [[]],
      empleado: []
    })
    this.editLicenciaForm = this._editLicencia.group({
      id: ['', Validators.required],
      fechaAlta: [],
      fechaBaja: [],
      fechaInicioLicencia: [],
      fechaFinLicencia: [],
      fechaFrancoCompensatorio: [],
      fechaCierre: [],
      fechaControl: [],
      fechaSincronizacion: [],
      observacionesLicencia: [""],
      comentarios: [[]],
      documentosAdjuntosLicencia: [[]],
      tipoLicencia: [],
      fechasCambioEstadoLicencia: [[]],
      empleado: []
    })
  }

  ngOnInit(): void {
    this.cargarLicencia();
    this.cargarTipoLicencia();
    this.isAdmin = this._tokenService.IsAdmin();
  }

  cargarTipoLicencia(): void {
    this._tipoLicenciaService.list(this.searchPage).subscribe(
      data => {
        this.tipoLicenciaArray = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarLicencia(): void {
    this._licenciaService.list(this.searchPage).subscribe(
      data => {
        this.licenciaArray = data;
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

  borrarLicencia(id?: number): void {
    this._licenciaService.delete(id).subscribe(
      data => {
        Swal.fire({
          title: "Éxito al eliminar",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarLicencia();
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
    const licencia = new Licencia();
    licencia.fechaInicioLicencia = this.licenciaForm.get('fechaInicioLicencia')?.value;
    licencia.fechaFinLicencia = this.licenciaForm.get('fechaFinLicencia')?.value;
    licencia.observacionesLicencia = this.licenciaForm.get('observacionesLicencia')?.value;
    licencia.tipoLicencia = this.licenciaForm.get('tipoLicencia')?.value;
    if ((licencia.fechaFinLicencia && licencia.fechaInicioLicencia) == undefined) {
      Swal.fire({
        title: "Debe llevar un rango de fechas",
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false
      })
      return this.success;
    }
    if (licencia.tipoLicencia == null) {
      Swal.fire({
        title: "Debe llevar un tipo de licencia",
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false
      })
      return this.success;
    }
    if ((new Date(licencia.fechaFinLicencia)).getTime() < (new Date(licencia.fechaInicioLicencia)).getTime()){
      Swal.fire({
        title: "La fecha Fin debe ser posterior a la fecha Inicio",
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false
      })
      return this.success;
    }
    if (((new Date(licencia.fechaFinLicencia)).getTime() - (new Date(licencia.fechaInicioLicencia)).getTime()) / (1000 * 60 * 60 * 24) > licencia.tipoLicencia.limiteRangoDias) {
      Swal.fire({
        title: "El rango de fechas supera el límite",
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false
      })
      return this.success;
    }
    if (this.licenciaForm.valid == true) {
      console.log(licencia);
      this._licenciaService.save(licencia).subscribe(
        data => {
          this.success = true;
          Swal.fire({
            title: "Éxito al crear",
            icon: "success",
            showCloseButton: false,
            showConfirmButton: false
          });
          this.cargarLicencia();
          this.router.navigate(['/solicitar-licencia']);
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
  open(id?: number): void {
    this.testModal = new bootstrap.Modal(document.getElementById('editModal'), {
      keyboard: false
    })
    this.cargarLicenciaForUpdate(id);
    this.testModal?.show();
  }
  cargarLicenciaForUpdate(id?: number): void {
    this._licenciaService.detail(id).subscribe(
      data => {
        this.newLicencia = data;
        console.log(this.newLicencia);
        this.editLicenciaForm = this._editLicencia.group({
          id: [this.newLicencia.id, Validators.required],
          fechaAlta: [],
          fechaBaja: [],
          fechaInicioLicencia: [this.newLicencia.fechaInicioLicencia],
          fechaFinLicencia: [this.newLicencia.fechaFinLicencia],
          tipoLicencia: [this.newLicencia.tipoLicencia],
          observacionesLicencia: [this.newLicencia.observacionesLicencia],
          fechaFrancoCompensatorio: [],
          fechaCierre: [],
          fechaControl: [],
          fechaSincronizacion: [],
          comentarios: [[]],
          documentosAdjuntosLicencia: [[]],
          fechasCambioEstadoLicencia: [[]],
          empleado: []
        });
        
        
      },
      err => {
        alert(err);
      }
    );
  }

  onUpdate(id?: number): boolean {
    this.newLicencia.fechaInicioLicencia = this.editLicenciaForm.get('fechaInicioLicencia')?.value;
    this.newLicencia.fechaFinLicencia = this.editLicenciaForm.get('fechaFinLicencia')?.value;
    this.newLicencia.tipoLicencia = this.editLicenciaForm.get('tipoLicencia')?.value;
    this.newLicencia.observacionesLicencia = this.editLicenciaForm.get('observacionesLicencia')?.value;
    if ((this.newLicencia.fechaFinLicencia && this.newLicencia.fechaInicioLicencia) == undefined) {
      Swal.fire({
        title: "Debe llevar un rango de fechas",
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false
      })
      return this.success;
    }
    if ((new Date(this.newLicencia.fechaFinLicencia)).getTime() < (new Date(this.newLicencia.fechaInicioLicencia)).getTime()){
      Swal.fire({
        title: "La fecha Fin debe ser posterior a la fecha Inicio",
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false
      })
      return this.success;
    }
    if (this.newLicencia.tipoLicencia == null) {
      Swal.fire({
        title: "Debe llevar un tipo de licencia",
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false
      })
      return this.success;
    }
    if (((new Date(this.newLicencia.fechaFinLicencia)).getTime() - (new Date(this.newLicencia.fechaInicioLicencia)).getTime()) / (1000 * 60 * 60 * 24) > this.newLicencia.tipoLicencia.limiteRangoDias) {
      Swal.fire({
        title: "El rango de fechas supera el límite",
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false
      })
      return this.success;
    }
    this.success = true;
    this._licenciaService.update(id, this.newLicencia).subscribe(
      data => {
        Swal.fire({
          title: "Éxito al actualizar",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarLicencia();
        this.testModal?.hide();
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
    return this.success

  }
  openDetail(id?: number): void {
    this.modal = new bootstrap.Modal(document.getElementById('detalleModal'), {
      keyboard: false
    })
    this.cargarForDetail(id);
    this.modal?.show();
  }
  cargarForDetail(id?: number): void {
    this._licenciaService.detail(id).subscribe(
      data => {
        this.newLicencia = data;
      },
      err => {
        alert(err.error.mensaje);
        this.volver();
      }
    );
  }
  volver(): void {
    this.modal?.hide();
    this.router.navigate(['solicitar-licencia']);
  }


}
