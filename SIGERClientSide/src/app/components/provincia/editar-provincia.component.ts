import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Provincia } from 'src/app/models/provincia';
import { ProvinciaService } from 'src/app/services/provincia.service';

@Component({
  selector: 'app-editar-provincia',
  templateUrl: './editar-provincia.component.html',
  styleUrls: ['./editar-provincia.component.css']
})
export class EditarProvinciaComponent implements OnInit {


  provinciaForm: FormGroup;
  provincia: Provincia = new Provincia('','');
  constructor(
    private provinciaService:ProvinciaService, 
    private _provincia:FormBuilder, 
    private router:Router,
    private _activatedRoute: ActivatedRoute) {
      this.provinciaForm = this._provincia.group({
        id: ['',Validators.required],
        codigo: ['',[Validators.required, Validators.maxLength(10)]],
        denominacion: ['', Validators.required]
      })
     }

     ngOnInit(): void {
      const id = this._activatedRoute.snapshot.params.id;
      this.provinciaService.detail(id).subscribe(
        data => {
          this.provincia = data;
          console.log(this.provincia);
        },
        err => {
          console.log(err);
          
        }
      );
  }
    onUpdate():void{
      const id = this._activatedRoute.snapshot.params.id;
      this.provincia.codigo=this.provinciaForm.get('codigo')?.value;
      this.provincia.denominacion=this.provinciaForm.get('denominacion')?.value;
      this.provinciaService.update(id, this.provincia).subscribe(
        data=>{
          alert('Provincia actualizada Satisfactoriamente');
          this.router.navigate(['/provincia']);
        },
        err => {
          console.log(err);
        }
      );
    }

}
