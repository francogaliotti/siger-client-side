import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private _loginForm: FormBuilder, private _loginService: LoginService) { 
    this.ChangeBody();

    //Login form
    this.loginForm = this._loginForm.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      rememberme: [false]
    });
  }

  ngOnInit(): void {
  }

  ChangeBody(){
    document.body.style.backgroundImage = "url('assets/images/Login2.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
  }

  SignIn(){

    const user: Usuario = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
      recordarme: this.loginForm.get('rememberme')?.value,
      correoInstitucional: this.loginForm.get('username')?.value,
      esPrimerInicio: false,
      requiereAutorizacion: false,
      rolNecesario: "",
      enabled: false,
      roles: Array()
    }

    this._loginService.SignIn().subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });

  }
}