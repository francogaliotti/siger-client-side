import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
import { Empleado } from 'src/app/models/empleado';
import { AuthService } from 'src/app/services/auth.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  empleado: Empleado = new Empleado();
  id: number;
  modal: Modal | undefined;
  editEmpleadoForm: FormGroup;
  faEdit = faEdit;

  constructor(
    private _empleado: EmpleadoService,
    private _token: TokenService,
    private _editForm: FormBuilder
  ) {
    this.editEmpleadoForm = this._editForm.group({
      id: ['', Validators.required],
      correoPersonal: [],
      nroTelefonoCelular: [],
      
    })

  }

  ngOnInit(): void {
    this.cargarEmpleado();
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

}
