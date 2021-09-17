import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {

  constructor() { 
    this.ChangeBody();
  }

  ngOnInit(): void {
  }

  ChangeBody(){
    document.body.style.backgroundImage = "url('assets/images/Login2.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
  }
}
