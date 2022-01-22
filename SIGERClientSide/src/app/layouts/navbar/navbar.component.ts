import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faSignOut = faArrowRight;

  isLogged = false;
  username: string | null = '';
  role: string = '';
  id:number;
  usuario: Usuario = new Usuario("","","","",0);

  constructor(private router: Router, private _tokenService: TokenService, private _authService: AuthService) { }

  ngOnInit(): void {
    if (this._tokenService.getToken()) {
      this.isLogged = true;
      this.role = 'Usuario';
      this.username = this._tokenService.getUsername();
      this.id = this._tokenService.getUserId();
      this._authService.getByUserId(this.id).subscribe(
        data => {
          this.usuario = data;
          },
        err => {
          alert(err);
        }
      );
      if(this._tokenService.IsAdmin()){
        this.role = 'Administrador'
      }
    } else {
      this.isLogged = false;
      this.username = '';
    }
  }

  onLogOut(): void {
    this._tokenService.logOut();
    this.isLogged = false;
    this.router.navigate(['/login']);
  }

}