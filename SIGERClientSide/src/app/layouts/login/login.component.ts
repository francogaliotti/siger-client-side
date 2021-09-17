import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AppService } from 'src/app/services/app.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private _loginForm: FormBuilder, private _loginService: LoginService, private _AppService: AppService, private router: Router) { 
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
      enabled: false
    }

    this._AppService.authenticate(user, () => {
      this.router.navigateByUrl("/")
    });
  }
}