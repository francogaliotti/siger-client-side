import { Component, OnInit } from '@angular/core';
import { faEye, faCheck, faTimes, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Licencia } from 'src/app/models/licencia';
import { LicenciaService } from 'src/app/services/licencia.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/models/empleado';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-autorizar-licencia',
  templateUrl: './autorizar-licencia.component.html',
  styleUrls: ['./autorizar-licencia.component.css']
})
export class AutorizarLicenciaComponent implements OnInit {

  faEye = faEye;
  faTimes = faTimes;
  faCheck = faCheck;
  faArrow = faArrowAltCircleLeft;

  isAdmin = false;

  searchPage = 0;
  page = 0;
  search: string = '';
  success: boolean;
  date: Date = new Date();

  licenciaArray: Licencia[] = []
  id: number;
  empleado: Empleado = new Empleado();
  modal: Modal | undefined;
  rejectModal: Modal | undefined;
  rejectForm: FormGroup;
  newLicencia: Licencia = new Licencia();

  constructor(private _tokenService: TokenService, private _licenciaService: LicenciaService,
    private router: Router, private _empleadoService: EmpleadoService, private _reject: FormBuilder) {
    this.rejectForm = this._reject.group({
      id: [this.newLicencia.id, Validators.required],
      mensajeRechazo: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.cargarLicencia();
    this.cargarEmpleado();
    this.id = this._tokenService.getUserId();
    this.isAdmin = this._tokenService.IsAdmin();
  }

  cargarLicencia(): void {
    this._licenciaService.list(this.searchPage).subscribe(
      data => {
        const lic: Licencia[] = [];
        for (let l of data) {
          if (l.empleado.sector.id == this.empleado.sector.id) {
            lic.push(l);
          }
        }
        this.licenciaArray = lic;
        for (let tipo of this.licenciaArray) {
          tipo.estadoActual = tipo.fechasCambioEstadoLicencia.find(e => e.fechaFinEstadoLicencia == null).estadoLicencia.nombreEstadoLicencia;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarEmpleado(): void {
    const id = this._tokenService.getUserId();
    this._empleadoService.getByUsuarioId(id).subscribe(
      data => {
        this.empleado = data;
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


  onAuthorize(id?: number): boolean {
    this.success = false;
    let flag: boolean = false;
    this._licenciaService.detail(id).subscribe(
      data => {
        this.newLicencia = data;
        console.log(this.newLicencia);
        if (this.newLicencia.empleado.remanenteDiasLicencias != undefined) {
          for (let [index, rem] of Object.entries(this.newLicencia.empleado.remanenteDiasLicencias)) {
            if (rem.tipoLicencia.id == this.newLicencia.tipoLicencia.id) {
              if (rem.anioRemanente == this.date.getFullYear()) {
                if (((new Date(this.newLicencia.fechaFinLicencia)).getTime() - (new Date(this.newLicencia.fechaInicioLicencia)).getTime()) / (1000 * 60 * 60 * 24) > rem.diasSobrantes) {
                  Swal.fire({
                    title: "El empleado no posee la cantidad de dias disponibles",
                    icon: "error",
                    showCloseButton: false,
                    showConfirmButton: false
                  })
                  this.cargarLicencia();
                } else {
                  flag = true
                }
              }
            }
          }
        }
        if (flag) {
          this._licenciaService.authorize(id).subscribe(
            data => {
              this.success = true;
              Swal.fire({
                title: "Licencia Autorizada",
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
              console.log(err);
              this.cargarLicencia();
            })
          this.newLicencia = null;
        }
      },
      err => {
        console.log(err);
      }
    );
    return this.success;
  }

  open(id?: number): void {
    this.rejectModal = new bootstrap.Modal(document.getElementById('rejectModal'), {
      keyboard: false
    })
    this.cargarLicenciaForReject(id);
    this.rejectModal?.show();
  }

  cargarLicenciaForReject(id?: number): void {
    this._licenciaService.detail(id).subscribe(
      data => {
        this.newLicencia = data;
        console.log(this.newLicencia);
        this.rejectForm = this._reject.group({
          id: [this.newLicencia.id, Validators.required],
          mensajeRechazo: [this.newLicencia.mensajeRechazo, Validators.required]
        })
      },
      err => {
        console.log(err);
      }
    )
  }

  onReject(id: number): void {
    this.newLicencia.mensajeRechazo = this.rejectForm.get('mensajeRechazo')?.value;
    this._licenciaService.reject(id, this.newLicencia).subscribe(
      data => {
        Swal.fire({
          title: "Licencia Rechazada",
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
      })
    this.rejectModal?.hide();
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
        this.newLicencia.estadoActual = this.newLicencia.fechasCambioEstadoLicencia.find(e => e.fechaFinEstadoLicencia == null).estadoLicencia.nombreEstadoLicencia;
      },
      err => {
        alert(err.error.mensaje);
        this.volver();
      }
    );
  }
  volver(): void {
    this.modal?.hide();
    this.router.navigate(['autorizar-licencia']);
  }

}
