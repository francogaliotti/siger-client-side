import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Provincia } from 'src/app/models/provincia';
import { ProvinciaService } from 'src/app/services/provincia.service';

@Component({
  selector: 'app-nuevo-provincia',
  templateUrl: './nuevo-provincia.component.html',
  styleUrls: ['./nuevo-provincia.component.css']
})
export class NuevoProvinciaComponent implements OnInit {

  provinciaForm: FormGroup;
  constructor(private provinciaService:ProvinciaService, 
    private _provincia:FormBuilder, 
    private router:Router) {
      this.provinciaForm= _provincia.group({
        codigo: ['',[Validators.required, Validators.maxLength(10)]],
        denominacion: ['', Validators.required]
      })
    }

  ngOnInit(): void {
  }
  onCreate():void{
    const provincia = new Provincia(this.provinciaForm.get('codigo')?.value,
    this.provinciaForm.get('denominacion')?.value);
    this.provinciaService.save(provincia).subscribe(
      data => {
        alert('Provincia creado Satisfactoriamente');
        this.router.navigate(['/provincia']);
      },
      err => {
        alert(err.error.mensaje);
        
      }
    );
  }

}
