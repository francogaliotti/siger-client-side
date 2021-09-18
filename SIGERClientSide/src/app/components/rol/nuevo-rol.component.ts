import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-nuevo-rol',
  templateUrl: './nuevo-rol.component.html',
  styleUrls: ['./nuevo-rol.component.css']
})
export class NuevoRolComponent implements OnInit {

  rolForm:FormGroup;
  constructor(private rolService:RolService, 
    private _rol:FormBuilder, 
    private router:Router) {
      this.rolForm=_rol.group({
        codigoRol: ['',[Validators.required, Validators.maxLength(10)]],
        nombreRol: ['', Validators.required],
        permisos: ['', Validators.required]
      })
    }
 

  ngOnInit(): void {
  }

  onCreate():void{
    const rol = new Rol(this.rolForm.get('codigoRol')?.value,
    this.rolForm.get('nombreRol')?.value, 
    this.rolForm.get('permisos')?.value);
    this.rolService.save(rol).subscribe(
      data=>{
        alert('Rol creado satisfactoriamente');
        this.router.navigate(['/rol']);
      },err=>{
        alert(err.error.mensaje);
      }
    )
  }

}
