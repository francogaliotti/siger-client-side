import { Component, Input, OnInit } from '@angular/core';
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
  editPermisoForm: FormGroup;
  
  permiso: Permiso

  @Input() id: number;
  @Input() codigoPermiso: string;
  @Input() nombrePermiso: string;

  constructor(
    private permisoService:PermisoService, 
    private _permiso:FormBuilder, 
    private router:Router,
    private activatedRoute: ActivatedRoute) {
      this.editPermisoForm = this._permiso.group({
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
    onUpdate(id: number):void{
      
      this.permiso.codigoPermiso=this.editPermisoForm.get('codigoPermiso')?.value;
      this.permiso.nombrePermiso=this.editPermisoForm.get('nombrePermiso')?.value;
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
