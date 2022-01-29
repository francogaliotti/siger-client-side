import { Component, OnInit } from '@angular/core';
import { faEye, faCheck, faTimes, faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Licencia } from 'src/app/models/licencia';
import { LicenciaService } from 'src/app/services/licencia.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/models/empleado';

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
  
  licenciaArray: Licencia[] = []
  id: number;
  empleado: Empleado = new Empleado();
  modal: Modal | undefined;
  newLicencia: Licencia = new Licencia();

  constructor(private _tokenService: TokenService, private _licenciaService: LicenciaService,
    private router: Router, private _empleadoService: EmpleadoService) { }

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
          for (let e of l.tipoLicencia.tipoRequerimiento.aprobadores) {
            if (e.id == this.empleado.id) {
              lic.push(l);
            }
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

  onAuthorize(id?: number): void{
    this._licenciaService.authorize(id).subscribe(
      data=>{
      Swal.fire({
        title: "Licencia Autorizada",
        icon: "success",
        showCloseButton: false,
        showConfirmButton: false
      });
      this.cargarLicencia();
    },
      err =>{
        Swal.fire({
          title: "Oops! hubo un problema",
          icon: "error",
          showCloseButton: false,
          showConfirmButton: false
        });
    })
  }

  onReject(id: number): void{
    this._licenciaService.reject(id).subscribe(
      data=>{
      Swal.fire({
        title: "Licencia Rechazada",
        icon: "success",
        showCloseButton: false,
        showConfirmButton: false
      });
      this.cargarLicencia();
    },
      err =>{
        Swal.fire({
          title: "Oops! hubo un problema",
          icon: "error",
          showCloseButton: false,
          showConfirmButton: false
        });
    })
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
