import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Permiso } from 'src/app/models/permiso';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-editar-rol',
  templateUrl: './editar-rol.component.html',
  styleUrls: ['./editar-rol.component.css']
})
export class EditarRolComponent implements OnInit {

  rolForm:FormGroup;
  rol: Rol = new Rol('','',[]);

  constructor(private rolService:RolService, 
    private _rol:FormBuilder, 
    private activatedRoute: ActivatedRoute,
    private router:Router) {
      this.rolForm=_rol.group({
        id: ['',Validators.required],
        codigoRol: ['',[Validators.required, Validators.maxLength(10)]],
        nombreRol: ['', Validators.required],
        permisos: ['', Validators.required]
      })
    }
 

    ngOnInit(): void {
      const id = this.activatedRoute.snapshot.params.id;
      this.rolService.detail(id).subscribe(
        data => {
          this.rol = data;
          console.log(this.rol);
        },
        err => {
          console.log(err);
          
        }
      );
  }
  onUpdate():void{
    const id = this.activatedRoute.snapshot.params.id;
    this.rol.codigoRol=this.rolForm.get('codigoRol')?.value;
    this.rol.nombreRol=this.rolForm.get('nombreRol')?.value;
    this.rol.permisos=this.rolForm.get('permisos')?.value;
    this.rolService.update(id,this.rol).subscribe(
      data=>{
        alert('Rol actualizado Satisfactoriamente');
        this.router.navigate(['/rol']);
      },
      err => {
        console.log(err);
      }
    )
  }
}
