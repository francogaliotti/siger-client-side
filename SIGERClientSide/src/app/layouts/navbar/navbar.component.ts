import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
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
  id: number| null = 0;

  constructor(private router: Router, private _tokenService: TokenService) { }

  ngOnInit(): void {
    if (this._tokenService.getToken()) {
      this.isLogged = true;
      this.role = 'Usuario';
      this.id = this._tokenService.getUserId();
      this.username = this._tokenService.getUsername();
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