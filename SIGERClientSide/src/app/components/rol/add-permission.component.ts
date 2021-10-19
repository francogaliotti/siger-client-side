import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Permiso } from 'src/app/models/permiso';
import { PermisoService } from 'src/app/services/permiso.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.css']
})
export class AddPermissionComponent implements OnInit {

  modal : Modal | undefined;

  permisos: Permiso[];

  constructor(private _permiso: PermisoService) { }

  ngOnInit(): void {
    this.getAll();
  }

  open_modal(): void{
    this.modal = new bootstrap.Modal(document.getElementById('addPermission'), {keyboard : false});

    this.modal?.show();
  }

  close_modal(): void{
    this.modal?.hide();
  }

  getAll(): void{
    this._permiso.list().subscribe(data =>{
      this.permisos = data;
    }, error => {
      console.log(error);
    });
    
  }

  getAllSelected(): any{

    let selecteds: any[] = new Array();

    $.each($("input[name='permissions']:checked"), function(){
      selecteds.push($(this).val());
    });

    return selecteds;
  }

}
