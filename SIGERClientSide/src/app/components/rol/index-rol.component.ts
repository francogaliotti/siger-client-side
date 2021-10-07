import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Permiso } from 'src/app/models/permiso';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-index-rol',
  templateUrl: './index-rol.component.html',
  styleUrls: ['./index-rol.component.css']
})
export class IndexRolComponent implements OnInit {

  faEdit = faEdit;
  faTrash = faTrash;
  newRolForm: FormGroup;
  roles: Rol[];


  constructor(private _rol: RolService, private _newRolForm: FormBuilder) { }

  ngOnInit(): void {

    this.loadForm_WithoutData();

  }

  loadForm_WithoutData(){
    this.newRolForm = this._newRolForm.group({
      nameRol: ['', [Validators.required, Validators.maxLength(20)]],
      permiso: ['', [Validators.required]]
    });
  }

  onCreate(){
    
  }

  deleteRol(id: number){

  }

  open(id: number,name: string, permisos: Permiso[]){

  }

  checkForm(){

  }

}
