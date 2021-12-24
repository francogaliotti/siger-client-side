import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-first-signin',
  templateUrl: './first-signin.component.html',
  styleUrls: ['./first-signin.component.css']
})
export class FirstSigninComponent implements OnInit {

  firstSigninForm : FormGroup;

  constructor(private _formBuilder: FormBuilder) 
  {
    this.firstSigninForm = this._formBuilder.group({
      firstname : ['',[Validators.required, Validators.maxLength(40)]],
      lastname: ['',[Validators.required, Validators.maxLength(40)]],
      CUIL: ['',[Validators.required, Validators.maxLength(40)]],
      nationality: ['', Validators.required],
      personalEmail: ['',[Validators.required, Validators.email, Validators.maxLength(150)]],
      dpvEmail: ['',[Validators.required, Validators.email, Validators.maxLength(150)]],
      username: ['',[Validators.required, Validators.maxLength(40)]],
      password: ['',[Validators.required, Validators.maxLength(30)]],
      neighborhood: ['', Validators.maxLength(30)],
      floor: [0, Validators.maxLength(4)],
      block: ['', Validators.maxLength(3)],
      street: ['', Validators.maxLength(50)],
      house: [0,Validators.maxLength(3)],
      height: [0, Validators.maxLength(6)],
      apartment: [0,Validators.maxLength(3)],
      sector: [0,Validators.maxLength(3)],
    });
  }

  getEmployee(): void{

  }

  ngOnInit(): void {
  }

}
