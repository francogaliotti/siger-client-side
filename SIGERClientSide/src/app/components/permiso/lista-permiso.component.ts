import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Permiso } from 'src/app/models/permiso';
import { PermisoService } from 'src/app/services/permiso.service';
import { faEdit, faFileAlt, faGrinTongueSquint, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { sequence } from '@angular/animations';

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

  @ViewChild("CreatePermission")CreatePermission: ElementRef;

  success: boolean;

  constructor(private permisoService: PermisoService, private router: Router, private _permiso: FormBuilder, private renderer: Renderer2) {

    this.formNewPermiso = this._permiso.group({
      codigoPermiso: ['', [Validators.required, Validators.maxLength(10)]],
      nombrePermiso: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.cargarPermisos();
  }
  cargarPermisos(): void {
    this.permisoService.list().subscribe(
      data => {
        this.permisos = data
      }, err => {
        console.log(err);
      }
    )
  }
  borrarPermiso(id?: number): void {
    this.permisoService.delete(id).subscribe(
      data => {
        alert("Se ha eliminado el Permiso");
        this.cargarPermisos();
      }, err => {
        console.log(err);
      }
    )
  }

  onCreate(): boolean {

    this.success = false;

    const permiso = new Permiso(this.formNewPermiso.get('codigoPermiso')?.value,
      this.formNewPermiso.get('nombrePermiso')?.value);

    if (this.formNewPermiso.valid == true) {
      this.permisoService.save(permiso).subscribe(
        data => {    
          this.success = true;
          this.cargarPermisos();
        },
        err => {
          console.log(err.error.mensaje);
        }
      );

    }

    return this.success;
  }

  checkForm(): void{
    if(this.formNewPermiso.get('codigoPermiso')?.valid && this.formNewPermiso.get('nombrePermiso')?.valid){
      this.renderer.setProperty(this.CreatePermission.nativeElement, 'disabled', false);
    }else{
      this.renderer.setProperty(this.CreatePermission.nativeElement, 'disabled', true);
    }
  }
}
