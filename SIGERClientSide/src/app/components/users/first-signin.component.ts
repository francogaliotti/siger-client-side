import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-first-signin',
  templateUrl: './first-signin.component.html',
  styleUrls: ['./first-signin.component.css']
})
export class FirstSigninComponent implements OnInit {

  firstSigninForm: FormGroup;
  employee: Empleado;

  constructor(private _formBuilder: FormBuilder, private _token: TokenService, private _employees: EmpleadoService) {
    this.getEmployee();
  }

  getEmployee(): void {
    this._employees.getByUserName(this._token.getUsername()).subscribe(data => {
      this.employee = data;
    }, error => {
      console.log(error);
    });
  }

  loadForm(): void {
    this.firstSigninForm = this._formBuilder.group({
      firstname : [this.employee.nombre,[Validators.required, Validators.maxLength(40)]],
      lastname: [this.employee.apellido,[Validators.required, Validators.maxLength(40)]],
      CUIL: [this.employee.cuil,[Validators.required, Validators.maxLength(40)]],
      nationality: [this.employee.nacionalidad, Validators.required],
      personalEmail: [this.employee.correoPersonal,[Validators.required, Validators.email, Validators.maxLength(150)]],
      dpvEmail: [this.employee.usuario.correoInstitucional,[Validators.required, Validators.email, Validators.maxLength(150)]],
      username: [this.employee.usuario.username,[Validators.required, Validators.maxLength(40)]],
      password: [this.employee.usuario.password,[Validators.required, Validators.maxLength(30)]],
      floor: [this.employee.domicilio.nroPiso, Validators.maxLength(4)],
      street: [this.employee.domicilio.calle, Validators.maxLength(50)],
      height: [this.employee.domicilio.nroCalle, Validators.maxLength(6)],
      apartment: [this.employee.domicilio.nroDepartamento,Validators.maxLength(3)],
      sector: [this.employee.historialSectorEmpleado.find(x => x.vigente).sector.denominacion,Validators.maxLength(3)],
    });
  }

  ngOnInit(): void {
  }

}
