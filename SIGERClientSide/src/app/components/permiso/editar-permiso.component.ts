import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Permiso } from 'src/app/models/permiso';
import { PermisoService } from 'src/app/services/permiso.service';

@Component({
  selector: 'app-editar-permiso',
  templateUrl: './editar-permiso.component.html',
  styleUrls: ['./editar-permiso.component.css']
})
export class EditarPermisoComponent implements OnInit {
  permisoForm: FormGroup;
  permiso: Permiso = new Permiso('','');
  constructor(
    private permisoService:PermisoService, 
    private _permiso:FormBuilder, 
    private router:Router,
    private activatedRoute: ActivatedRoute) {
      this.permisoForm = this._permiso.group({
        id: ['',Validators.required],
        codigoPermiso: ['',[Validators.required, Validators.maxLength(10)]],
        nombrePermiso: ['', Validators.required]
      })
     }

     ngOnInit(): void {
      const id = this.activatedRoute.snapshot.params.id;
      this.permisoService.detail(id).subscribe(
        data => {
          this.permiso = data;
          console.log(this.permiso);
        },
        err => {
          console.log(err);
          
        }
      );
  }
    onUpdate():void{
      const id = this.activatedRoute.snapshot.params.id;
      this.permiso.codigoPermiso=this.permisoForm.get('codigoPermiso')?.value;
      this.permiso.nombrePermiso=this.permisoForm.get('nombrePermiso')?.value;
      this.permisoService.update(id, this.permiso).subscribe(
        data=>{
          alert('Permiso actualizado Satisfactoriamente');
          this.router.navigate(['/permiso']);
        },
        err => {
          console.log(err);
        }
      );

        
      
    }

}
