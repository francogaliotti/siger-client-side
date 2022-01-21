import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { TipoBoletaDTO } from 'src/app/dto/tipo-boleta-dto';
import { Boleta } from 'src/app/models/boleta';
import { faEye, faArrowAltCircleDown, faEdit, faFileAlt, faPlusCircle, faTrash, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import * as bootstrap from 'bootstrap';
import { ZonaInhospita } from 'src/app/models/zona-inhospita';
import { Viatico } from 'src/app/models/viatico';
import { Empleado } from 'src/app/models/empleado';
import { Movilidad } from 'src/app/models/movilidad';
import { Router } from '@angular/router';
import { BoletaService } from 'src/app/services/boleta.service';
import { TokenService } from 'src/app/services/token.service';
import { TipoBoletaService } from 'src/app/services/tipo-boleta.service';
import { MovilidadService } from 'src/app/services/movilidad.service';
import { ZonaInhospitaService } from 'src/app/services/zona-inhospita.service';
import { ViaticoService } from 'src/app/services/viatico.service';
import Swal from 'sweetalert2';
import { EmpleadoService } from 'src/app/services/empleado.service';


@Component({
  selector: 'app-solicitar-boleta',
  templateUrl: './solicitar-boleta.component.html',
  styleUrls: ['./solicitar-boleta.component.css']
})
export class SolicitarBoletaComponent implements OnInit {

  tipoBoletaArray: TipoBoletaDTO[] = [];
  movilidadArray: Movilidad[] = [];
  viaticoArray: Viatico[] = [];
  zonaInhospita: ZonaInhospita[] = [];
  boletaArray: Boleta[] = [];

  boletaForm: FormGroup;
  editBoletaForm: FormGroup;
  testModal: Modal | undefined;
  modal: Modal | undefined;
  newBoleta: Boleta = new Boleta();
  success: boolean;

  faEdit = faEdit;
  faTrash = faTrash;
  faArrow = faArrowAltCircleLeft;
  faPlusCircle = faPlusCircle;
  faEye = faEye;

  id: number;
  empleado: Empleado = new Empleado();

  isAdmin = false;

  searchPage = 0;
  page = 0;
  search: string = '';

  constructor(private _boleta: FormBuilder, private _boletaService: BoletaService,
    private router: Router, private _editBoleta: FormBuilder, private _tokenService: TokenService, private _tipoBoletaService: TipoBoletaService,
    private _movilidadService: MovilidadService, private _zonaInhospitaService: ZonaInhospitaService, private viaticoService: ViaticoService,
    private _empleadoService: EmpleadoService) {
    this.boletaForm = this._boleta.group({
      fechaAlta: [],
      fechaBaja: [],
      numero: [],
      fechaHoraLlegada: [],
      fechaHoraSalida: [],
      fechaHoraPosibleLlegada: [],
      fechaHoraPosibleSalida: [],
      periodo: 0,
      fechaCierre: [],
      fechaControl: [],
      observacionesBoleta: [""],
      fechaSincronizacion: [],
      sinFichadaRetorno: false,
      sinFichadaSalida: false,
      zonaInhospita: [],
      viatico: [],
      fechasCambioEstadoBoleta: [[]],
      documentosAdjuntosBoleta: [[]],
      movilidades: [[]],
      tipoBoleta: [],
      comentarios: [[]],
      empleado: []
    })
    this.editBoletaForm = this._editBoleta.group({
      id: ['', Validators.required],
      fechaAlta: [],
      fechaBaja: [],
      numero: [],
      fechaHoraLlegada: [],
      fechaHoraSalida: [],
      fechaHoraPosibleLlegada: [],
      fechaHoraPosibleSalida: [],
      periodo: 0,
      fechaCierre: [],
      fechaControl: [],
      observacionesBoleta: [""],
      fechaSincronizacion: [],
      sinFichadaRetorno: false,
      sinFichadaSalida: false,
      zonaInhospita: [],
      viatico: [],
      fechasCambioEstadoBoleta: [[]],
      documentosAdjuntosBoleta: [[]],
      movilidades: [[]],
      tipoBoleta: [],
      comentarios: [[]],
      empleado: []
    })
  }

  ngOnInit(): void {
    this.isAdmin = this._tokenService.IsAdmin();
    this.cargarEmpleado();
    this.cargarBoleta();
    this.cargarMovilidad();
    this.cargarTipoBoleta();
    this.cargarViatico();
    this.cargarZonaInhospita();
    this.id = this._tokenService.getUserId();

  }
  cargarBoleta(): void {
    this._boletaService.list(this.searchPage).subscribe(
      data => {
        const bol: Boleta[] = [];
        for (let b of data) {
          if (b.empleado != null) {
            if (b.empleado.id == this.empleado.id) {
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
  cargarTipoBoleta(): void {
    this._tipoBoletaService.list(this.searchPage).subscribe(
      data => {
        this.tipoBoletaArray = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  cargarMovilidad() {
    this._movilidadService.list(this.searchPage).subscribe(
      data => {
        this.movilidadArray = data;

      },
      err => {
        console.log(err);
      }
    );
  }
  cargarViatico(): void {
    this.viaticoService.list(this.searchPage).subscribe(
      data => {
        this.viaticoArray = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  cargarZonaInhospita(): void {
    this._zonaInhospitaService.list(this.searchPage).subscribe(
      data => {
        this.zonaInhospita = data;
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
  borrarBoleta(id?: number): void {
    this._boletaService.delete(id).subscribe(
      data => {
        Swal.fire({
          title: "Éxito al eliminar",
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
      }
    );
  }
  onCreate(): boolean {
    this.success = false;
    const boleta = new Boleta();
    boleta.empleado = this.empleado;
    boleta.tipoBoleta = this.boletaForm.get('tipoBoleta')?.value;
    boleta.fechaHoraPosibleSalida = this.boletaForm.get('fechaHoraPosibleSalida')?.value;
    boleta.fechaHoraPosibleLlegada = this.boletaForm.get('fechaHoraPosibleLlegada')?.value;
    boleta.observacionesBoleta = this.boletaForm.get('observacionesBoleta')?.value;
    boleta.zonaInhospita = this.boletaForm.get('zonaInhospita')?.value;
    boleta.viatico = this.boletaForm.get('viatico')?.value;
    boleta.movilidades = this.boletaForm.get('movilidades')?.value;
    boleta.sinFichadaRetorno = this.boletaForm.get('sinFichadaRetorno')?.value;
    boleta.sinFichadaSalida = this.boletaForm.get('sinFichadaSalida')?.value;


    if ((boleta.fechaHoraPosibleLlegada && boleta.fechaHoraPosibleSalida) == undefined) {
      Swal.fire({
        title: "Debe llevar un rango de fechas",
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false
      })
      return this.success;
    }
    if (boleta.tipoBoleta == null) {
      Swal.fire({
        title: "Debe llevar un tipo de boleta",
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false
      })
      return this.success;
    }
    if ((new Date(boleta.fechaHoraPosibleLlegada)).getTime() < (new Date(boleta.fechaHoraPosibleSalida)).getTime()) {
      Swal.fire({
        title: "La fecha Fin debe ser posterior a la fecha Inicio",
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false
      })
      return this.success;
    }
    if (this.boletaForm.valid == true) {
      this._boletaService.save(boleta).subscribe(
        data => {
          this.success = true;
          Swal.fire({
            title: "Éxito al crear",
            icon: "success",
            showCloseButton: false,
            showConfirmButton: false
          });
          this.cargarBoleta();
          this.router.navigate(['/solicitar-boleta']);
          console.log(boleta);
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
    this.cargarBoletaForUpdate(id);
    this.testModal?.show();
  }
  cargarBoletaForUpdate(id?: number): void {
    this._boletaService.detail(id).subscribe(
      data => {
        this.newBoleta = data;
        console.log(this.newBoleta);
        this.editBoletaForm = this._editBoleta.group({
          id: [this.newBoleta.id, Validators.required],
          fechaAlta: [],
          fechaBaja: [],
          numero: [],
          fechaHoraLlegada: [],
          fechaHoraSalida: [],
          fechaHoraPosibleLlegada: [this.newBoleta.fechaHoraPosibleLlegada],
          fechaHoraPosibleSalida: [this.newBoleta.fechaHoraPosibleSalida],
          periodo: 0,
          fechaCierre: [],
          fechaControl: [],
          empleado: [this.newBoleta.empleado],
          observacionesBoleta: [this.newBoleta.observacionesBoleta],
          fechaSincronizacion: [],
          sinFichadaRetorno: [this.newBoleta.sinFichadaRetorno],
          sinFichadaSalida: [this.newBoleta.sinFichadaSalida],
          zonaInhospita: [this.newBoleta.zonaInhospita],
          viatico: [this.newBoleta.viatico],
          fechasCambioEstadoBoleta: [[]],
          documentosAdjuntosBoleta: [[]],
          movilidades: [this.newBoleta.movilidades],
          tipoBoleta: [this.newBoleta.tipoBoleta],
          comentarios: [[]]

        });


      },
      err => {
        alert(err);
      }
    );
  }
  onUpdate(id?: number): boolean {
    this.newBoleta.fechaHoraPosibleLlegada = this.editBoletaForm.get('fechaHoraPosibleLlegada')?.value;
    this.newBoleta.fechaHoraPosibleSalida = this.editBoletaForm.get('fechaHoraPosibleSalida')?.value;
    this.newBoleta.observacionesBoleta = this.editBoletaForm.get('observacionesBoleta')?.value;
    this.newBoleta.tipoBoleta = this.editBoletaForm.get('tipoBoleta')?.value;
    this.newBoleta.viatico = this.editBoletaForm.get('viatico')?.value;
    this.newBoleta.zonaInhospita = this.editBoletaForm.get('zonaInhospita')?.value;
    this.newBoleta.movilidades = this.editBoletaForm.get('movilidades')?.value;
    this.newBoleta.sinFichadaRetorno = this.editBoletaForm.get('sinFichadaRetorno')?.value;
    this.newBoleta.sinFichadaSalida = this.editBoletaForm.get('sinFichadaSalida')?.value;

    if ((this.newBoleta.fechaHoraPosibleLlegada && this.newBoleta.fechaHoraPosibleSalida) == undefined) {
      Swal.fire({
        title: "Debe llevar un rango de fechas",
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false
      })
      return this.success;
    }
    if (this.newBoleta.tipoBoleta == null) {
      Swal.fire({
        title: "Debe llevar un tipo de boleta",
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false
      })
      return this.success;
    }
    if ((new Date(this.newBoleta.fechaHoraPosibleLlegada)).getTime() < (new Date(this.newBoleta.fechaHoraPosibleSalida)).getTime()) {
      Swal.fire({
        title: "La fecha Fin debe ser posterior a la fecha Inicio",
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false
      })
      return this.success;
    }
    this.success = true;
    this._boletaService.update(id, this.newBoleta).subscribe(
      data => {
        Swal.fire({
          title: "Éxito al actualizar",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarBoleta();
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
    this.router.navigate(['solicitar-boleta']);
  }

}
