import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { Permiso } from 'src/app/models/permiso';
import { PermisoService } from 'src/app/services/permiso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-permiso',
  templateUrl: './editar-permiso.component.html',
  styleUrls: ['./editar-permiso.component.css']
})
export class EditarPermisoComponent implements OnInit {
  editPermisoForm: FormGroup;

  permiso: Permiso;
  success: boolean;

  modal: Modal | undefined;

  @Output() refreshEvent = new EventEmitter<string>();
  @ViewChild("EditPermission") editPermission: ElementRef;

  constructor(
    private _permiso: PermisoService,
    private permisoForm: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2) {

      this.loadForm_WithoutData();
  }

  ngOnInit(): void {
  }

  onUpdate(id: number): boolean {

    this.success = false;
    this.permiso.codigoPermiso = this.editPermisoForm.get('codigoPermiso')?.value;
    this.permiso.nombrePermiso = this.editPermisoForm.get('nombrePermiso')?.value;

    if(this.editPermisoForm.valid){
      this._permiso.update(id, this.permiso).subscribe(
        data => {
          Swal.fire({
            title: "Éxito",
            icon: "success",
            showCloseButton: false,
            showConfirmButton: false
          });
  
          this.refreshEvent.emit();
          this.success = true;
        },
        err => {
          console.log(err);
  
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

 loadData_ToUpdate(id: number, codPermission: string, namePermission: string): void{
    this.permiso = {
      codigoPermiso: codPermission,
      id: id,
      nombrePermiso: namePermission
    }
    this.loadForm_WithData();
  }

  loadForm_WithData(){
    this.editPermisoForm = this.permisoForm.group({
      id: [this.permiso.id, Validators.required],
      codigoPermiso: [this.permiso.codigoPermiso, [Validators.required, Validators.maxLength(10)]],
      nombrePermiso: [this.permiso.nombrePermiso, Validators.required]
    })
  }

  loadForm_WithoutData(){
    this.editPermisoForm = this.permisoForm.group({
      id: ['', Validators.required],
      codigoPermiso: ['', [Validators.required, Validators.maxLength(10)]],
      nombrePermiso: ['', Validators.required]
    })
  }

  checkForm(): void {
    if (this.editPermisoForm.get('codigoPermiso')?.valid && this.editPermisoForm.get('nombrePermiso')?.valid) {
      this.renderer.setProperty(this.editPermission.nativeElement, 'disabled', false);
    } else {
      this.renderer.setProperty(this.editPermission.nativeElement, 'disabled', true);
    }
  }
  
  open(id: number, codPermission: string, namePermission: string): void {
    this.modal = new bootstrap.Modal(document.getElementById('editModal'), {
      keyboard: false
    })
    this.loadData_ToUpdate(id, codPermission, namePermission);
    this.modal?.show();
  }

  close(): void {
    this.modal.hide();
  }
}
