import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { LoginUsuario } from '../models/login-usuario';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  usuario: Usuario = new Usuario("", "", "", "");

  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario;
  username: string;
  password: string;
  roles: string[] = [];
  errMsj: string;

  constructor(private _tokenService: TokenService,
    private router: Router,
    private _loginForm: FormBuilder,
    private _authService: AuthService) {
    this.ChangeBody();

    //Login form
    this.loginForm = this._loginForm.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      rememberme: [false]
    });
  }

  ngOnInit(): void {
    if (this._tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this._tokenService.getAuthorities();
    }
  }

  ChangeBody() {
    document.body.style.backgroundImage = "url('assets/images/Login2.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
  }

  SignIn() {

    this.loginUsuario = new LoginUsuario(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value);

    /*const user: Usuario = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
      recordarme: this.loginForm.get('rememberme')?.value,
      correoInstitucional: this.loginForm.get('username')?.value,
      esPrimerInicio: false,
      requiereAutorizacion: false,
      rolNecesario: "",
      enabled: false,
      roles: Array()
    }*/

    this._authService.LogIn(this.loginUsuario).subscribe(data => {
      this.isLogged = true;
      this._tokenService.setToken(data.token);
      this._tokenService.setUsername(data.username);
      this._tokenService.setAuthorities(data.authorities);
      this.roles = data.authorities;

      console.log(data);
      this.router.navigate(['/home']);
    }, error => {
      this.isLogged = false;
      
      console.log(error);
    });

  }
}
