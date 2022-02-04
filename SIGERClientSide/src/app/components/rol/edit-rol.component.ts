import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { Rol } from 'src/app/models/rol';
import { PermisoService } from 'src/app/services/permiso.service';
import { Permiso } from 'src/app/models/permiso';
import * as $ from 'jquery';
import { RolService } from 'src/app/services/rol.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-rol',
  templateUrl: './edit-rol.component.html',
  styleUrls: ['./edit-rol.component.css']
})
export class EditRolComponent implements OnInit {

  rol: Rol;
  permisos: Permiso[];
  modal: Modal|undefined;
  editRolForm: FormGroup;
  success: boolean;

  @ViewChild('EditRol') editRol: ElementRef;
  @Output() refreshEvent = new EventEmitter<string>();

  constructor(private _permission: PermisoService, private _rol: RolService, 
    private editRolFormBuilder: FormBuilder, private renderer: Renderer2) {
  }

  loadForm(rolName: string = "", idRol: string = ""): void{
    this.editRolForm = this.editRolFormBuilder.group({
      rolName: [rolName, [Validators.required, Validators.maxLength(20)]],
      idRol: [idRol, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.loadForm();
    this.getPermissions();
  }

  getPermissions(): void{
    this._permission.list().subscribe(data => {
      this.permisos = data;
    }, error => {
      console.log(error);
    })
  }

  openEditModal(id: number, rolName: string): void{
    this.modal = new bootstrap.Modal(document.getElementById('editRol'), {keyboard: true});
    this.loadForm(rolName, id.toString());
    this.permissionsChecked(id, this.modal);
  }

  permissionsChecked(id: number, modal: Modal): void{

    this._rol.detail(id).subscribe(data => {
      this.rol = data;

      var aux_permissions = this.rol.permisos;
      $.each($("[name='editPermissions']"), function(){
        
        aux_permissions.forEach(aux_permission => {
          if($(this).val() == aux_permission.id){
            $(this).prop('checked', true);
          }
        });
        
        modal.show();

      });

    }, error => {
      console.log(error);
    })
  }

  close_modal(): void{
    this.modal.hide();

    $.each($("[name='editPermissions']:checked"), function(){
      $(this).prop('checked', false);
    });
  }

  onUpdate(): boolean{

    if(this.editRolForm.valid){

      let id_permissions: any[] = new Array();
      
      $.each($("[name='editPermissions']:checked"), function(){
        id_permissions.push($(this).val());
      });

      if(id_permissions.length > 0){

        let permissions: Permiso[] = new Array();

        id_permissions.forEach(id_permission => {
          const permission: Permiso = {
            id: id_permission,
            codigoPermiso: '',
            nombrePermiso: ''
          };

          permissions.push(permission);
        });

        const rol: Rol = {
          id: this.editRolForm.get('idRol').value,
          nombreRol: this.editRolForm.get('rolName').value,
          rolNombre: this.editRolForm.get('rolName').value,
          permisos: permissions,
          codigoRol: ''
        }

        this._rol.update(this.editRolForm.get('idRol').value, rol).subscribe(data =>{

          this.success= true;

          this.refreshEvent.emit();

          Swal.fire({
            title: "Éxito",
            icon: "success",
            showCloseButton: false,
            showConfirmButton: false
          });

          this.close_modal();
        }, error =>{
          console.log(error);

          this.success = false;

          Swal.fire({
            title: "Oops! hubo un problema",
            icon: "error",
            showCloseButton: false,
            showConfirmButton: false
          });
        })

      }else{
        this.success = false;
      }

    }else{
      this.success = false;
    }

    return true;
  }

  submit_form(){
    this.onUpdate();
  }

  checkForm(){
    if (this.editRolForm.get('rolName')?.valid) {
      this.renderer.setProperty(this.editRol.nativeElement, 'disabled', false);
    } else {
      this.renderer.setProperty(this.editRol.nativeElement, 'disabled', true);
    }
  }
}
