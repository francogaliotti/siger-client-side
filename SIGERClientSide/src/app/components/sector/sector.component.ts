import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { faEye, faArrowAltCircleDown, faEdit, faFileAlt, faPlusCircle, faTrash, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import * as bootstrap from 'bootstrap';
import { TokenService } from 'src/app/services/token.service';
import * as $ from 'jquery';
import { Sector } from 'src/app/models/sector';
import { SectorService } from 'src/app/services/sector.service';
import Swal from 'sweetalert2';
import { TipoSector } from 'src/app/models/tipo-sector';
import { Domicilio } from 'src/app/models/domicilio';
import { TipoSectorService } from 'src/app/services/tipo-sector.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/models/empleado';


@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent implements OnInit {

  sector: Sector[] = [];
  tipoSectorArray: TipoSector[] = [];
  newSector: Sector = new Sector("", "", false, false, false, 0, 0, new TipoSector("", ""), null);
  sectorForm: FormGroup;
  editSectorForm: FormGroup;
  testModal: Modal | undefined;
  modal: Modal | undefined;

  success: boolean;
  empleados: Empleado[];

  faEdit = faEdit;
  faTrash = faTrash;
  faArrow = faArrowAltCircleLeft;
  faPlusCircle = faPlusCircle;
  faEye = faEye;

  isAdmin = false;

  searchPage = 0;
  page = 0;
  search: string = '';

  constructor(private _sector: FormBuilder, private _sectorService: SectorService, private tipoSectorService: TipoSectorService,
    private router: Router, private _editSector: FormBuilder, private _tokenService: TokenService, private _empleadoService: EmpleadoService) {
    this.sectorForm = this._sector.group({
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      denominacion: ['', Validators.required],
      validaFueraDeHorario: [false],
      permiteTrabajarHorasExtras: [false],
      permiteTrabajarFinDeSemana: [false],
      maximoSerenoDiurno: [0],
      maximoSerenoNocturno: [0],
      tipoSector: [],
      sectorSuperior: []
    })
    this.editSectorForm = this._editSector.group({
      id: ['', Validators.required],
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      denominacion: ['', Validators.required],
      validaFueraDeHorario: [false],
      permiteTrabajarHorasExtras: [false],
      permiteTrabajarFinDeSemana: [false],
      maximoSerenoDiurno: [0],
      maximoSerenoNocturno: [0],
      tipoSector: [],
      sectorSuperior: []
    })
  }

  ngOnInit(): void {
    this.isAdmin = this._tokenService.IsAdmin();
    this.cargarSector();
    this.tipoSectorList();
  }
  cargarSector(): void {
    this._sectorService.list(0).subscribe(
      data => {
        this.sector = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  tipoSectorList(): void {
    this.tipoSectorService.list(this.searchPage).subscribe(
      data => {
        this.tipoSectorArray = data;
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
  borrarSector(id?: number): boolean {
    this.success = false;
    let flag: boolean = true;
    this._empleadoService.list(0).subscribe(
      data => {
        this.empleados = data;
        for (let em of this.empleados) {
          if (em.sector.id == id) {
            Swal.fire({
              title: "El sector tiene empleados asociados",
              icon: "error",
              showCloseButton: false,
              showConfirmButton: false
            });
            this.cargarSector();
            flag = false;
          }
        }
        if (flag) {
          this._sectorService.delete(id).subscribe(
            data => {
              Swal.fire({
                title: "Éxito al eliminar",
                icon: "success",
                showCloseButton: false,
                showConfirmButton: false
              });
              this.cargarSector();
              this.success = true;
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
      },
      err => {
        Swal.fire({
          title: "Oops! hubo un problema",
          icon: "error",
          showCloseButton: false,
          showConfirmButton: false
        });
        console.log(err);
      }
    )
    return this.success;
  }
  onCreate(): boolean {
    this.success = false;
    const sector = new Sector(
      this.sectorForm.get('codigo')?.value,
      this.sectorForm.get('denominacion')?.value,
      this.sectorForm.get('validaFueraDeHorario')?.value,
      this.sectorForm.get('permiteTrabajarHorasExtras')?.value,
      this.sectorForm.get('permiteTrabajarFinDeSemana')?.value,
      this.sectorForm.get('maximoSerenoDiurno')?.value,
      this.sectorForm.get('maximoSerenoNocturno')?.value,
      this.sectorForm.get('tipoSector')?.value,
      this.sectorForm.get('sectorSuperior')?.value);
    if (this.sectorForm.valid == true) {
      console.log(sector);
      this._sectorService.save(sector).subscribe(
        data => {
          this.success = true;
          Swal.fire({
            title: "Éxito al crear",
            icon: "success",
            showCloseButton: false,
            showConfirmButton: false
          });
          this.cargarSector();
          this.router.navigate(['/sector']);
        },
        err => {
          Swal.fire({
            title: "Oops! hubo un problema",
            icon: "error",
            showCloseButton: false,
            showConfirmButton: false
          });
          this.router.navigate(['/sector']);
        }
      );
    }
    return this.success;
  }
  cargarSectorForUpdate(id?: number): void {
    this._sectorService.detail(id).subscribe(
      data => {
        this.newSector = data;
        console.log(this.newSector);
        this.editSectorForm = this._editSector.group({
          id: [this.newSector.id, Validators.required],
          codigo: [this.newSector.codigo, [Validators.required, Validators.maxLength(10)]],
          denominacion: [this.newSector.denominacion, Validators.required],
          validaFueraDeHorario: [this.newSector.validaFueraDeHorario],
          permiteTrabajarHorasExtras: [this.newSector.permiteTrabajarHorasExtras],
          permiteTrabajarFinDeSemana: [this.newSector.permiteTrabajarFinDeSemana],
          maximoSerenoDiurno: [this.newSector.maximoSerenoDiurno],
          maximoSerenoNocturno: [this.newSector.maximoSerenoNocturno],
          tipoSector: [this.newSector.tipoSector],
          sectorSuperior: [this.newSector.sectorSuperior]
        });
      },
      err => {
        alert(err);
      }
    );
  }
  open(id?: number): void {
    this.testModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
      keyboard: false
    })
    this.cargarSectorForUpdate(id);
    this.testModal?.show();
  }
  onUpdate(id?: number): void {
    this.newSector.codigo = this.editSectorForm.get('codigo')?.value;
    this.newSector.denominacion = this.editSectorForm.get('denominacion')?.value;
    this.newSector.maximoSerenoDiurno = this.editSectorForm.get('maximoSerenoDiurno')?.value;
    this.newSector.maximoSerenoNocturno = this.editSectorForm.get('maximoSerenoNocturno')?.value;
    this.newSector.permiteTrabajarFinDeSemana = this.editSectorForm.get('permiteTrabajarFinDeSemana')?.value;
    this.newSector.permiteTrabajarHorasExtras = this.editSectorForm.get('permiteTrabajarHorasExtras')?.value;
    this.newSector.validaFueraDeHorario = this.editSectorForm.get('validaFueraDeHorario')?.value;
    this.newSector.tipoSector = this.editSectorForm.get('tipoSector')?.value;
    this.newSector.sectorSuperior = this.editSectorForm.get('sectorSuperior')?.value;
    this._sectorService.update(id, this.newSector).subscribe(
      data => {
        Swal.fire({
          title: "Éxito al actualizar",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarSector();
        this.testModal?.hide();
      },
      err => {
        Swal.fire({
          title: "Oops! hubo un problema",
          icon: "error",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarSector();
        this.testModal?.hide();
      }
    );
  }
  openDetail(id?: number): void {
    this.modal = new bootstrap.Modal(document.getElementById('detalleModal'), {
      keyboard: false
    })
    this.cargarSectorForDetail(id);
    this.modal?.show();
  }
  cargarSectorForDetail(id?: number): void {
    this._sectorService.detail(id).subscribe(
      data => {
        this.newSector = data;
      },
      err => {
        alert(err.error.mensaje);
        this.volver();
      }
    );
  }
  volver(): void {
    this.modal?.hide();
    this.router.navigate(['sector']);
  }
}
