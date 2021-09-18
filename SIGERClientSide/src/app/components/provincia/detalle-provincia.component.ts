import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Provincia } from 'src/app/models/provincia';
import { ProvinciaService } from 'src/app/services/provincia.service';

@Component({
  selector: 'app-detalle-provincia',
  templateUrl: './detalle-provincia.component.html',
  styleUrls: ['./detalle-provincia.component.css']
})
export class DetalleProvinciaComponent implements OnInit {
  provincia:Provincia;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private provinciaService: ProvinciaService) { }

    ngOnInit(): void {
      const id = this.activatedRoute.snapshot.params.id;
      this.provinciaService.detail(id).subscribe(
        data => {
          this.provincia = data;
          
        },
        err => {
          alert(err.error.mensaje);
          
          this.volver();
        }
      );
  }
  volver(): void {
    this.router.navigate(['provincia']);
  }

}
