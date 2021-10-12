import { Component, OnInit } from '@angular/core';
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
  username: string|null = '';

  constructor(private _tokenService: TokenService) { }

  ngOnInit(): void {
    if(this._tokenService.getToken()){
      this.isLogged = true;
      this.username = this._tokenService.getUsername();
    }else{
      this.isLogged = false;
      this.username = '';
    }
  }

  onLogOut(): void{
    this._tokenService.logOut();
    window.location.reload();
  }

}
