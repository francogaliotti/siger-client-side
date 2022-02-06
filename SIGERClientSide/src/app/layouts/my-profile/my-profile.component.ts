import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Departamento } from 'src/app/models/departamento';
import { Empleado } from 'src/app/models/empleado';
import { Localidad } from 'src/app/models/localidad';
import { Provincia } from 'src/app/models/provincia';
import { AuthService } from 'src/app/services/auth.service';
import { DatosGobArService } from 'src/app/services/datos-gob-ar.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  empleado: Empleado = new Empleado();
  id: number;
  testModal: Modal | undefined;
  editEmpleadoForm: FormGroup;
  faEdit = faEdit;
  provincias: Provincia[];
  success: boolean;
  departamentos: Departamento[];
  localidades: Localidad[];


  constructor(
    private _empleado: EmpleadoService,
    private _token: TokenService,
    private _editForm: FormBuilder,
    private _datosGob: DatosGobArService
  ) {
    this.editEmpleadoForm = this._editForm.group({
      id: ['', Validators.required],
      correoPersonal: [],
      nroTelefonoCelular: [],
      calle: [],
      nroCalle: [],
      nroDepartamento: [], 
      nroPiso: [],
      localidad: [],
      provincia: [],
      departamento: []
    })

  }

  ngOnInit(): void {
    this.cargarEmpleado();
    this.getProvincias();
    console.log(this.empleado)
  }
  cargarEmpleado(): void {
    const id = this._token.getUserId();
    this._empleado.getByUsuarioId(id).subscribe(
      data => {
        this.empleado = data;
        console.log(data)
      },
      err => {
        console.log(err);
      }
    );
  }
  getProvincias(): void {
    this._datosGob.listProvincias().subscribe(data => {
      this.provincias = data;
    }, err => {
      console.log(err);
    })
  }
  getDepartamentos(id: number): boolean {
    this.success = false;
    if (id == null) {
      Swal.fire({
        title: "Seleccione una Provincia",
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false
      });
      return this.success
    }
    this._datosGob.listDepartamentosByProvincia(id).subscribe(data => {
      this.success = true;
      this.departamentos = data;
    }, err => {

      console.log(err);
    })
    return this.success;
  }
  getLocalidades(id: number): boolean {
    this.success = false;
    if (id == null) {
      Swal.fire({
        title: "Seleccione un Departamento",
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false
      });
      return this.success
    }
    this._datosGob.listLocalidadesByDepartamento(id).subscribe(data => {
      this.success = true;
      this.localidades = data;
    }, err => {

      console.log(err);
    })
    return this.success;
  }
  open(id?: number): void {
    this.testModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
      keyboard: false
    })
    //this.cargarTipoLicenciaForUpdate(id);
    this.testModal?.show();
  }

}
