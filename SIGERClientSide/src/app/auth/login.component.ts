import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { LoginUsuario } from '../dto/login-usuario';
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
  }

  ChangeBody() {
    document.body.style.backgroundImage = "url('assets/images/Login2.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
  }

  SignIn() {

    this.loginUsuario = new LoginUsuario(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value);
    
    this._authService.LogIn(this.loginUsuario).subscribe(data => {
      this.isLogged = true;
      this._tokenService.setToken(data.token);

    }, error => {
      this.isLogged = false;
      this.isLoginFail = true;
      console.log(error);
    });


    this._authService.isFirstSignIn(this._tokenService.getUsername()).subscribe(data => {
      if(data){
        this.router.navigate(['/firstSignIn']);
      }else{
        this.router.navigate(['/home']);
      }
    });

  }
}
