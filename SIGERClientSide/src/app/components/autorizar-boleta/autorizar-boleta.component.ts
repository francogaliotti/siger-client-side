import { Component, OnInit } from '@angular/core';
import { Boleta } from 'src/app/models/boleta';
import { BoletaService } from 'src/app/services/boleta.service';
import { faEye, faCheck, faTimes, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/models/empleado';

@Component({
  selector: 'app-autorizar-boleta',
  templateUrl: './autorizar-boleta.component.html',
  styleUrls: ['./autorizar-boleta.component.css']
})
export class AutorizarBoletaComponent implements OnInit {

  faEye = faEye;
  faTimes = faTimes;
  faCheck = faCheck;
  faArrow = faArrowAltCircleLeft;

  isAdmin = false;

  searchPage = 0;
  page = 0;
  search: string = '';

  boletaArray: Boleta[] = [];
  id: number;
  modal: Modal | undefined;
  newBoleta: Boleta = new Boleta();
  empleado: Empleado = new Empleado()

  constructor(private _tokenService: TokenService, private _boletaService: BoletaService,
    private router: Router, private _empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.cargarBoleta();
    this.cargarEmpleado();
    this.id = this._tokenService.getUserId();
    this.isAdmin = this._tokenService.IsAdmin();
  }

  cargarBoleta(): void {
    this._boletaService.list(this.searchPage).subscribe(
      data => {
        const bol: Boleta[] = [];
        for (let b of data) {
          for (let e of b.tipoBoleta.tipoRequerimiento.aprobadores) {
            if (e.id == this.empleado.id) {
              bol.push(b);
            }
          }
        }
        this.boletaArray = bol;
        for (let tipo of this.boletaArray) {
          tipo.estadoActual = tipo.fechasCambioEstadoBoleta.find(e => e.fechaFinEstadoBoleta == null).estadoBoleta.nombreEstadoBoleta;
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

  onAuthorize(id?: number): void {
    this._boletaService.authorize(id).subscribe(
      data => {
        Swal.fire({
          title: "Boleta Autorizada",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarBoleta();
      },
      err => {
        Swal.fire({
          title: "Oops! hubo un problema",
          icon: "error",
          showCloseButton: false,
          showConfirmButton: false
        });
      })
  }

  onReject(id: number): void {
    this._boletaService.reject(id).subscribe(
      data => {
        Swal.fire({
          title: "Boleta Rechazada",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarBoleta();
      },
      err => {
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
    this._boletaService.detail(id).subscribe(
      data => {
        this.newBoleta = data;
        this.newBoleta.estadoActual = this.newBoleta.fechasCambioEstadoBoleta.find(e => e.fechaFinEstadoBoleta == null).estadoBoleta.nombreEstadoBoleta;
      },
      err => {
        alert(err.error.mensaje);
        this.volver();
      }
    );
  }
  volver(): void {
    this.modal?.hide();
    this.router.navigate(['autorizar-boleta']);
  }
}
