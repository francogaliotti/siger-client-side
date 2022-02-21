import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
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
  faSearch = faSearch;
  provincias: Provincia[];
  success: boolean;
  departamentos: Departamento[];
  localidades: Localidad[];
  newEmpleado: Empleado = new Empleado();


  constructor(
    private _empleado: EmpleadoService,
    private _token: TokenService,
    private _editForm: FormBuilder,
    private _datosGob: DatosGobArService
  ) {
    this.editEmpleadoForm = this._editForm.group({
      id: ['', Validators.required],
      correoPersonal: ['', [Validators.required, Validators.email]],
      nroTelefonoCelular: [],
      calle: [""],
      nroCalle: [""],
      nroDepartamento: [""],
      nroPiso: [""],
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
    this.cargarEmpleadoForUpdate(id);
    this.testModal?.show();
  }
  cargarEmpleadoForUpdate(id: number) {
    this._empleado.detail(id).subscribe(
      data => {
        this.newEmpleado = data
        console.log(this.newEmpleado)
        this.editEmpleadoForm = this._editForm.group({
          id: [this.newEmpleado.id],
          correoPersonal: [this.newEmpleado.correoPersonal],
          nroTelefonoCelular: [this.newEmpleado.nroTelefonoCelular],
          calle: [this.newEmpleado.domicilio.calle],
          nroCalle: [this.newEmpleado.domicilio.nroCalle],
          nroDepartamento: [this.newEmpleado.domicilio.nroDepartamento],
          nroPiso: [this.newEmpleado.domicilio.nroPiso],
          localidad: [this.newEmpleado.domicilio.localidad],
          provincia: [this.newEmpleado.domicilio.provincia],
          departamento: [this.newEmpleado.domicilio.departamento]
        })
      }
    )
  }
  onUpdate(id?: number): boolean {
    this.success = false;
    this.newEmpleado.correoPersonal = this.editEmpleadoForm.get('correoPersonal')?.value;
    this.newEmpleado.nroTelefonoCelular = this.editEmpleadoForm.get('nroTelefonoCelular')?.value;
    this.newEmpleado.domicilio.calle = this.editEmpleadoForm.get('calle')?.value;
    this.newEmpleado.domicilio.nroCalle = this.editEmpleadoForm.get('nroCalle')?.value;
    this.newEmpleado.domicilio.nroPiso=this.editEmpleadoForm.get('nroPiso')?.value;
    this.newEmpleado.domicilio.nroDepartamento = this.editEmpleadoForm.get('nroDepartamento')?.value;
    this.newEmpleado.domicilio.localidad = this.editEmpleadoForm.get('localidad')?.value;
    this.newEmpleado.domicilio.provincia = this.editEmpleadoForm.get('provincia')?.value;
    this.newEmpleado.domicilio.departamento = this.editEmpleadoForm.get('departamento')?.value;
    if(!this.editEmpleadoForm.get('correoPersonal')?.value.includes("@")){
      Swal.fire({
        title: "Mail personal incorrecto",
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false
      });
      return this.success;
    }

    this._empleado.update(id, this.newEmpleado).subscribe(
      data => {
        Swal.fire({
          title: "Éxito al actualizar",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarEmpleado();
        this.testModal?.hide();
        this.success=true;
      },
      err => {
        Swal.fire({
          title: "Oops! hubo un problema",
          icon: "error",
          showCloseButton: false,
          showConfirmButton: false
        });
        console.log(err);
        this.cargarEmpleado();
        this.testModal?.hide();
      }
    );
    return this.success;

  }

}
