import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-home-adm',
  templateUrl: './home-adm.component.html',
  styleUrls: ['./home-adm.component.css']
})
export class HomeAdmComponent implements OnInit {
  isAdmin = false;

  constructor(private _tokenService: TokenService) { }

  ngOnInit(): void {
    this.isAdmin = this._tokenService.IsAdmin();
  }
  
}
