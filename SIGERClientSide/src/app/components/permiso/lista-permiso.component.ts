import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Permiso } from 'src/app/models/permiso';
import { PermisoService } from 'src/app/services/permiso.service';
import { faEdit, faFileAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditarPermisoComponent } from './editar-permiso.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-permiso',
  templateUrl: './lista-permiso.component.html',
  styleUrls: ['./lista-permiso.component.css']
})
export class ListaPermisoComponent implements OnInit {

  permisos: Permiso[] = [];

  faEdit = faEdit;
  faFileAlt = faFileAlt;
  faTrash = faTrash;

  formNewPermiso: FormGroup;

  @ViewChild("CreatePermission") CreatePermission: ElementRef;
  @ViewChild(EditarPermisoComponent) editPermission: EditarPermisoComponent;

  success: boolean;

  constructor(private permisoService: PermisoService, private router: Router, private _permiso: FormBuilder, private renderer: Renderer2) {

    this.formNewPermiso = this._permiso.group({
      codigoPermiso: ['', [Validators.required, Validators.maxLength(10)]],
      nombrePermiso: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.loadPermission();
  }

  loadPermission(): void {
    this.permisoService.list().subscribe(
      data => {
        this.permisos = data
      }, err => {
        console.log(err);
      }
    )
  }

  deletePermission(id: number): boolean {
    this.success = false;

    if (id != null) {
      this.permisoService.delete(id).subscribe(
        data => {
          this.loadPermission();
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

  onCreate(): boolean {

    this.success = false;

    const permiso: Permiso = {
      codigoPermiso: this.formNewPermiso.get('codigoPermiso')?.value,
      nombrePermiso: this.formNewPermiso.get('nombrePermiso')?.value
    };

    if (this.formNewPermiso.valid == true) {
      this.permisoService.save(permiso).subscribe(
        data => {
          this.success = true;
          this.loadPermission();

          Swal.fire({
            title: "Éxito",
            icon: "success",
            showCloseButton: false,
            showConfirmButton: false
          });
        },
        err => {
          console.log(err.error.mensaje);

          Swal.fire({
            title: "Oops! hubo un problema",
            icon: "error",
            showCloseButton: false,
            showConfirmButton: false
          });
        }
      );

    }

    return this.success;
  }

  checkForm(): void {
    if (this.formNewPermiso.get('codigoPermiso')?.valid && this.formNewPermiso.get('nombrePermiso')?.valid) {
      this.renderer.setProperty(this.CreatePermission.nativeElement, 'disabled', false);
    } else {
      this.renderer.setProperty(this.CreatePermission.nativeElement, 'disabled', true);
    }
  }

  open(id: number, codPermission: string, namePermission: string) {
    this.editPermission.open(id, codPermission, namePermission);
  }

  refreshTable($event: any): void {
    this.loadPermission();
  }
}
