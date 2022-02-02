import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogged = false;
  isAdmin = false;

  constructor(private _tokenService: TokenService, private _empleadoService: EmpleadoService) { 
    document.body.style.backgroundImage = null;
  }

  ngOnInit(): void {
    this.isLogged = this._tokenService.isLogged();
    this.isAdmin = this._tokenService.IsAdmin();
  }

  onLogOut(): void{
    this._tokenService.logOut();
  }

}
