import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-verticalnavbar',
  templateUrl: './verticalnavbar.component.html',
  styleUrls: ['./verticalnavbar.component.css']
})
export class VerticalnavbarComponent implements OnInit {

  isAdmin = false;

  constructor(private _tokenService: TokenService) { }

  ngOnInit(): void {
    this.isAdmin = this._tokenService.IsAdmin();
  }

}
