import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Permiso } from 'src/app/models/permiso';
import { PermisoService } from 'src/app/services/permiso.service';

@Component({
  selector: 'app-detalle-permiso',
  templateUrl: './detalle-permiso.component.html',
  styleUrls: ['./detalle-permiso.component.css']
})
export class DetallePermisoComponent implements OnInit {

  permiso: Permiso;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private permisoService: PermisoService) { }

    ngOnInit(): void {
      const id = this.activatedRoute.snapshot.params.id;
      this.permisoService.detail(id).subscribe(
        data => {
          this.permiso = data;
          
        },
        err => {
          alert(err.error.mensaje);
          
          this.volver();
        }
      );
  }
  volver(): void {
    this.router.navigate(['permiso']);
  }

}
