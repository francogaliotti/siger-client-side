import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { NacionalidadService } from 'src/app/services/nacionalidad.service';
import { RegimenHorarioService } from 'src/app/services/regimen-horario.service';
import { RemuneracionService } from 'src/app/services/remuneracion.service';
import { RolService } from 'src/app/services/rol.service';
import { faEye, faArrowAltCircleDown, faEdit, faFileAlt, faPlusCircle, faTrash, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { SectorService } from 'src/app/services/sector.service';
import { TokenService } from 'src/app/services/token.service';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { Sector } from 'src/app/models/sector';
import { RegimenHorario } from 'src/app/models/regimen-horario';
import { Remuneracion } from 'src/app/models/remuneracion';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  sectores: Sector[];
  regimenesHorario: RegimenHorario[];
  remuneraciones: Remuneracion[];
  isAdmin = false;

  testModal: Modal | undefined;
  modal: Modal | undefined;
  faEdit = faEdit;
  faTrash = faTrash;
  faArrow = faArrowAltCircleLeft;
  faPlusCircle = faPlusCircle;
  faEye = faEye;

  searchPage = 0;
  page = 0;
  search: string = '';
  empleados: Empleado[];
  newEmpleado: Empleado = new Empleado();
  editEmpleadoForm: FormGroup;


  constructor(
    private _editForm: FormBuilder,
    private _employee: EmpleadoService,
    private _remun: RemuneracionService,
    private _regimenH: RegimenHorarioService,
    private _sector: SectorService,
    private _tokenService: TokenService,
    private router: Router) { 
      this.editEmpleadoForm = this._editForm.group({
        id: ['', Validators.required],
        remuneracion: [],
        regimenHorario: [],
        sector: []
      })
    }

  ngOnInit(): void {
    this.getEmpleado();
    this.getRegimenHorario();
    this.getRemuneracion();
    this.getSector();
    this.isAdmin = this._tokenService.IsAdmin();
  }
  getEmpleado(): void{
    this._employee.list(0).subscribe(
      data=>{
        this.empleados = data;
      },
      err => {
        console.log(err);
      }
    )
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
  getSector(): void {
    this._sector.list(0).subscribe(data => {
      this.sectores = data;
    }, err => {
      console.log(err);
    })
  }
  getRemuneracion(): void {
    this._remun.list().subscribe(data => {
      this.remuneraciones = data;
    },
      err => {
        console.log(err);
      })
  }
  getRegimenHorario(): void {
    this._regimenH.page(0).subscribe(data => {
      this.regimenesHorario = data;
    },
      err => {
        console.log(err);
      })
  }
  open(id?: number): void {
    this.testModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
      keyboard: false
    })
    this.cargarEmpleadoForUpdate(id);
    this.testModal?.show();
  }
  cargarEmpleadoForUpdate(id: number){
    this._employee.detail(id).subscribe(
      data =>{
        this.newEmpleado = data
        console.log(this.newEmpleado)
        this.editEmpleadoForm = this._editForm.group({
          id: [this.newEmpleado.id],
          remuneracion: [this.newEmpleado.remuneracion],
          regimenHorario: [this.newEmpleado.regimenHorario],
          sector: [this.newEmpleado.sector]
        })
      } 
    )
  }
  onUpdate(id?: number): void {
    this.newEmpleado.sector = this.editEmpleadoForm.get('sector')?.value;
    this.newEmpleado.regimenHorario = this.editEmpleadoForm.get('regimenHorario')?.value;
    this.newEmpleado.remuneracion = this.editEmpleadoForm.get('remuneracion')?.value;
    
    this._employee.update(id, this.newEmpleado).subscribe(
      data => {
        Swal.fire({
          title: "Éxito al actualizar",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.getEmpleado();
        this.testModal?.hide();
      },
      err => {
        Swal.fire({
          title: "Oops! hubo un problema",
          icon: "error",
          showCloseButton: false,
          showConfirmButton: false
        });
        console.log(err);
        this.getEmpleado();
        this.testModal?.hide();
      }
    );

  }
  borrarEmpleado(id?: number): void {
    this._employee.delete(id).subscribe(
      data => {
        Swal.fire({
          title: "Éxito al eliminar",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.getEmpleado();
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
    this._employee.detail(id).subscribe(
      data => {
        this.newEmpleado = data;
      },
      err => {
        alert(err.error.mensaje);
        this.volver();
      }
    );
  }
  volver(): void {
    this.modal?.hide();
    this.router.navigate(['list-users']);
  }
}
