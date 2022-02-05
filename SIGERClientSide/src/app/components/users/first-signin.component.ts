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
      firstname : ['',[Validators.required, Validators.maxLength(40)]],
      lastname: ['',[Validators.required, Validators.maxLength(40)]],
      CUIL: ['',[Validators.required, Validators.maxLength(40)]],
      nationality: ['', Validators.required],
      personalEmail: ['',[Validators.required, Validators.email, Validators.maxLength(150)]],
      dpvEmail: ['',[Validators.required, Validators.email, Validators.maxLength(150)]],
      username: ['',[Validators.required, Validators.maxLength(40)]],
      password: ['',[Validators.required, Validators.maxLength(30)]],
      neighborhood: ['', Validators.maxLength(30)],
      floor: ['', Validators.maxLength(4)],
      block: ['', Validators.maxLength(3)],
      street: ['', Validators.maxLength(50)],
      house: ['',Validators.maxLength(3)],
      height: ['', Validators.maxLength(6)],
      apartment: ['',Validators.maxLength(3)],
      sector: ['',Validators.required],
    });
  }

  ngOnInit(): void {
  }
}
