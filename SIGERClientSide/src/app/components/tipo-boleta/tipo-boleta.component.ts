import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowAltCircleLeft, faEdit, faEye, faFileAlt, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import * as $ from 'jquery';
import { TipoBoletaDTO } from 'src/app/dto/tipo-boleta-dto';
import { Empleado } from 'src/app/models/empleado';
import { Sector } from 'src/app/models/sector';
import { TipoBoleta } from 'src/app/models/tipo-boleta';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { SectorService } from 'src/app/services/sector.service';
import { TipoBoletaService } from 'src/app/services/tipo-boleta.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-boleta',
  templateUrl: './tipo-boleta.component.html',
  styleUrls: ['./tipo-boleta.component.css']
})
export class TipoBoletaComponent implements OnInit {

  fapluscircle = faPlusCircle;
  faEdit = faEdit;
  faFileAlt = faFileAlt;
  faTrash = faTrash;
  faEye = faEye;
  faArrow = faArrowAltCircleLeft;

  tipoBoleta: TipoBoletaDTO = new TipoBoletaDTO("", "", false, false, false, false, false, 0, "", [], []);

  tipoBoletaArray: TipoBoletaDTO[] = [];

  sectorArray: Sector[] = [];

  empleadoArray: Empleado[] = [];

  tipoBoletaForm: FormGroup;

  editTipoBoletaForm: FormGroup;

  success: boolean;

  modal: Modal | undefined

  @ViewChild("CreatePermission") CreatePermission: ElementRef;

  @ViewChild("EditPermission") EditPermission: ElementRef;

  isAdmin = false;

  nivelesAutorizacionArray: number[] = [1, 2, 3, 4];

  searchPage = 0;
  page = 0;
  search: string = '';

  constructor(
    private _tipoBoleta: FormBuilder,
    private _editTipoBoleta: FormBuilder,
    private _tipoBoletaService: TipoBoletaService,
    private _sectorService: SectorService,
    private _empleadoService: EmpleadoService,
    private router: Router,
    private renderer: Renderer2,
    private _tokenService: TokenService
  ) {
    this.tipoBoletaForm = this._tipoBoleta.group({
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      tipoBoletaDenominacion: ['', Validators.required],
      tieneMovilidad: [false],
      tieneZonaInhospita: [false],
      tieneViatico: [false],
      permiteNoFichadaRetorno: [false],
      permiteNoFichadaSalida: [false],
      tipoRequerimientoCantNiveles: [0],
      tipoRequerimientoDenominacion: [""],
      tipoRequerimientoAprueban: [[]],
      tipoRequerimientoAprobadores: [[]]
    });
    this.editTipoBoletaForm = this._editTipoBoleta.group({
      id: ["", Validators.required],
      codigo: ["", [Validators.required, Validators.maxLength(10)]],
      tipoBoletaDenominacion: ["", Validators.required],
      tieneMovilidad: [],
      tieneZonaInhospita: [],
      tieneViatico: [],
      permiteNoFichadaRetorno: [],
      permiteNoFichadaSalida: [],
      tipoRequerimientoCantNiveles: [0],
      tipoRequerimientoDenominacion: [""],
      tipoRequerimientoAprueban: [[]],
      tipoRequerimientoAprobadores: [[]]
    });
  }

  ngOnInit(): void {
    this.cargarTipoBoleta();
    this.SectoresList();
    this.EmpleadosList();
    this.isAdmin = this._tokenService.IsAdmin();
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

  borrarTipoBoleta(id?: number): void {
    this._tipoBoletaService.delete(id).subscribe(
      data => {
        Swal.fire({
          title: "Éxito al eliminar",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarTipoBoleta();
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
    const tipoBoleta = new TipoBoletaDTO(
      this.tipoBoletaForm.get('codigo')?.value,
      this.tipoBoletaForm.get('tipoBoletaDenominacion')?.value,
      this.tipoBoletaForm.get('tieneMovilidad')?.value,
      this.tipoBoletaForm.get('tieneZonaInhospita')?.value,
      this.tipoBoletaForm.get('tieneViatico')?.value,
      this.tipoBoletaForm.get('permiteNoFichadaRetorno')?.value,
      this.tipoBoletaForm.get('permiteNoFichadaSalida')?.value,
      this.tipoBoletaForm.get('tipoRequerimientoCantNiveles')?.value,
      this.tipoBoletaForm.get('tipoRequerimientoDenominacion')?.value,
      this.tipoBoletaForm.get('tipoRequerimientoAprueban')?.value,
      this.tipoBoletaForm.get('tipoRequerimientoAprobadores')?.value
      );
      

    if (this.tipoBoletaForm.valid == true) {
      console.log(tipoBoleta);
      this._tipoBoletaService.save(tipoBoleta).subscribe(
        data => {
          this.success = true;

          Swal.fire({
            title: "Éxito al crear",
            icon: "success",
            showCloseButton: false,
            showConfirmButton: false
          });
          this.cargarTipoBoleta();
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
        this.empleadoArray = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  open(id?: number): void {
    this.modal = new bootstrap.Modal(document.getElementById('editarModal'), {
      keyboard: false
    })
    this.cargarTipoBoletaForUpdate(id);
    this.modal?.show();
  }

  cargarTipoBoletaForUpdate(id?: number): void {
    this._tipoBoletaService.detail(id).subscribe(
      data => {
        this.tipoBoleta = data;
        console.log(this.tipoBoleta);
        this.editTipoBoletaForm = this._editTipoBoleta.group({
          id: [this.tipoBoleta.id, Validators.required],
          codigo: [this.tipoBoleta.codigo, [Validators.required, Validators.maxLength(10)]],
          tipoBoletaDenominacion: [this.tipoBoleta.tipoBoletaDenominacion, Validators.required],
          tieneMovilidad: [this.tipoBoleta.tieneMovilidad],
          tieneViatico: [this.tipoBoleta.tieneViatico],
          tieneZonaInhospita: [this.tipoBoleta.tieneZonaInhospita],
          permiteNoFichadaRetorno: [this.tipoBoleta.permiteNoFichadaRetorno],
          permiteNoFichadaSalida: [this.tipoBoleta.permiteNoFichadaSalida]
        });
      },
      err => {
        alert(err);
      }
    );
  }

  onUpdate(id?: number): void {
    this.tipoBoleta.codigo = this.editTipoBoletaForm.get('codigo')?.value;
    this.tipoBoleta.tipoBoletaDenominacion = this.editTipoBoletaForm.get('tipoBoletaDenominacion')?.value;
    this._tipoBoletaService.update(id, this.tipoBoleta).subscribe(
      data => {
        Swal.fire({
          title: "Éxito al actualizar",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarTipoBoleta();
        this.modal?.hide();
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

  openDetail(id?: number): void {
    this.modal = new bootstrap.Modal(document.getElementById('detalleModal'), {
      keyboard: false
    })
    this.cargarTipoBoletaForDetail(id);
    this.modal?.show();
  }

  cargarTipoBoletaForDetail(id?: number): void {
    this._tipoBoletaService.detail(id).subscribe(
      data => {
        this.tipoBoleta = data;
      },
      err => {
        alert(err.error.mensaje);
        this.volver();
      }
    );
  }

  volver(): void {
    this.modal?.hide();
    this.router.navigate(['tipo-boleta']);
  }

  checkTipoBoletaForm(): void {
    if (this.tipoBoletaForm.get('codigo')?.valid && this.tipoBoletaForm.get('tipoBoletaDenominacion')?.valid) {
      this.renderer.setProperty(this.CreatePermission.nativeElement, 'disabled', false);
    } else {
      this.renderer.setProperty(this.CreatePermission.nativeElement, 'disabled', true);
    }
  }

  checkEditTipoBoletaForm(): void {
    if (this.editTipoBoletaForm.get('codigo')?.valid && this.editTipoBoletaForm.get('tipoBoletaDenominacion')?.valid) {
      this.renderer.setProperty(this.EditPermission.nativeElement, 'disabled', false);
    } else {
      this.renderer.setProperty(this.EditPermission.nativeElement, 'disabled', true);
    }
  }

}
