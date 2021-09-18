import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Permiso } from 'src/app/models/permiso';
import { PermisoService } from 'src/app/services/permiso.service';

@Component({
  selector: 'app-nuevo-permiso',
  templateUrl: './nuevo-permiso.component.html',
  styleUrls: ['./nuevo-permiso.component.css']
})
export class NuevoPermisoComponent implements OnInit {

  permisoForm: FormGroup;

  constructor(private permisoService:PermisoService, 
    private _permiso:FormBuilder, 
    private router:Router) {
    this.permisoForm= _permiso.group({
      codigoPermiso: ['',[Validators.required, Validators.maxLength(10)]],
      nombrePermiso: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }
  onCreate():void{
    const permiso = new Permiso(this.permisoForm.get('codigoPermiso')?.value,
    this.permisoForm.get('nombrePermiso')?.value);
    this.permisoService.save(permiso).subscribe(
      data => {
        alert('Permiso creado Satisfactoriamente');
        this.router.navigate(['/permiso']);
      },
      err => {
        alert(err.error.mensaje);
        
      }
    );
  }

}
