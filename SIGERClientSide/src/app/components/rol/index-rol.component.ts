import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Permiso } from 'src/app/models/permiso';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';
import Swal from 'sweetalert2';
import { AddPermissionComponent } from './add-permission.component';
import { EditRolComponent } from './edit-rol.component';

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
  success: boolean;

  @ViewChild(AddPermissionComponent) addpermission: AddPermissionComponent;
  @ViewChild(EditRolComponent) editRol: EditRolComponent;
  @ViewChild('CreateRol') createRol: ElementRef;

  constructor(private _rol: RolService, private _newRolForm: FormBuilder, private renderer: Renderer2) { }

  ngOnInit(): void {

    this.loadForm_WithoutData();
    this.getAll();
  }

  getAll() {
    this._rol.list().subscribe(data => {
      this.roles = data;
    }, error => {
      console.log(error);
    })
  }

  loadForm_WithoutData() {
    this.newRolForm = this._newRolForm.group({
      nameRol: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  add_permissions() {
    this.addpermission.open_modal();
  }


  onCreate() {

    this.success = false;

    if (this.newRolForm.valid) {

      let idPermissions: number[] = new Array();
      idPermissions = this.addpermission.getAllSelected();
      let permissions: Permiso[] = new Array();

      if (idPermissions.length > 0) {
        idPermissions.forEach(idPermission => {
          const per: Permiso = {
            id: idPermission,
            codigoPermiso: '',
            nombrePermiso: ''
          };

          permissions.push(per);
        });

        const rol: Rol = {
          codigoRol: "23",
          nombreRol: this.newRolForm.get('nameRol').value,
          rolNombre: this.newRolForm.get('nameRol').value,
          permisos: permissions,
          id: null
        }

        this._rol.save(rol).subscribe(data => {
          this.success = true;
          this.getAll();

          Swal.fire({
            title: "Éxito",
            icon: "success",
            showCloseButton: false,
            showConfirmButton: false
          });

        }, error => {
          console.log(console.error());

          Swal.fire({
            title: "Oops! hubo un problema",
            icon: "error",
            showCloseButton: false,
            showConfirmButton: false
          });

        });

      } else {

        Swal.fire({
          title: "Oops!",
          text: "Debe seleccionar los permisos que tendrá dicho rol.",
          icon: "warning",
          showCloseButton: false,
          showConfirmButton: false
        });
      }
    }

    return this.success;
  }

  deleteRol(id: number) {
    this.success = false;

    if (id != null) {
      this._rol.delete(id).subscribe(
        data => {
          this.getAll();
          this.success = true;

          Swal.fire({
            title: "Éxito",
            icon: "success",
            showCloseButton: false,
            showConfirmButton: false
          });
        }, err => {
          console.log(err);

          Swal.fire({
            title: "Oops! hubo un problema",
            icon: "error",
            showCloseButton: false,
            showConfirmButton: false
          });
        }
      )
    }

    return this.success;
  }

  open_modal(id: number, rolName: string) {
    this.editRol.openEditModal(id, rolName);
  }

  checkForm() {
    if (this.newRolForm.get('nameRol')?.valid) {
      this.renderer.setProperty(this.createRol.nativeElement, 'disabled', false);
    } else {
      this.renderer.setProperty(this.createRol.nativeElement, 'disabled', true);
    }
  }

  refreshTable($event: any): void {
    this.getAll();
  }
}
