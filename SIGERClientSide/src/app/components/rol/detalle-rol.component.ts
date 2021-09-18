import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-detalle-rol',
  templateUrl: './detalle-rol.component.html',
  styleUrls: ['./detalle-rol.component.css']
})
export class DetalleRolComponent implements OnInit {

  rol: Rol;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private rolService: RolService) { }

    ngOnInit(): void {
      const id = this.activatedRoute.snapshot.params.id;
      this.rolService.detail(id).subscribe(
        data => {
          this.rol = data;
          
        },
        err => {
          alert(err.error.mensaje);
          
          this.volver();
        }
      );
  }
  volver(): void {
    this.router.navigate(['rol']);
  }

}
