import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowAltCircleLeft, faEdit, faEye, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { Asistencia } from 'src/app/models/asistencia';
import { Empleado } from 'src/app/models/empleado';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-asistencias',
  templateUrl: './mis-asistencias.component.html',
  styleUrls: ['./mis-asistencias.component.css']
})
export class MisAsistenciasComponent implements OnInit {

  fapluscircle = faPlusCircle;
  faEdit = faEdit;
  //faFileAlt = faFileAlt;
  faEye = faEye;
  faTrash = faTrash;
  faArrow = faArrowAltCircleLeft;

  empleado: Empleado = new Empleado();
  
  employeeId: number | undefined;

  asistencia: Asistencia = new Asistencia(null, '',this.empleado,0);

  misAsistenciaArray: Asistencia[] = [];

  success: boolean;

  modal: Modal | undefined

  @ViewChild("CreatePermission") CreatePermission: ElementRef;

  @ViewChild("EditPermission") EditPermission: ElementRef;

  isAdmin = false;

  searchPage = 0;
  page = 0;
  search: string = '';

  constructor(
    private _asistenciaService: AsistenciaService,
    private _empleadoService: EmpleadoService,
    private router: Router,
    private _tokenService: TokenService  
  ) {}

  ngOnInit(): void {
    this.isAdmin = this._tokenService.IsAdmin();
    this.cargarAsistencia(this.findEmployee());
  }

  cargarAsistencia(id: number): void { 
    this._asistenciaService.list(this.searchPage).subscribe(
      data => {
        const misAsistencias: Asistencia[] = [];
        for(let a of data){
          if(a.empleado.id != null){
            if(a.empleado.id == this.empleado.id){
              misAsistencias.push(a);
            }
          }
        }
        this.misAsistenciaArray = misAsistencias;
      },
      err => {
        console.log(err);
      }
    );
  }

  findEmployee():number {
    const userId  = this._tokenService.getUserId();
    this._empleadoService.getByUsuarioId(userId).subscribe(
      data => {
        this.empleado = data;
        console.log("ID encontrado" +  this.empleado.id);
      },
      err => {
        console.log(err);
      }
    );
    return this.empleado.id;
  }

  nextPage() {
    this.page += 10;
    this.searchPage = this.searchPage + 1;
  }

  prevPage() {
    if (this.page > 0)
      this.page -= 10;
    this.searchPage = this.searchPage - 1;
  }

  onSearch(search: string) {
    this.page = 0;
    this.search = search;
  }

  borrarAsistencia(id?: number): void {
    this._asistenciaService.delete(id).subscribe(
      data => {
        Swal.fire({
          title: "Éxito",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.cargarAsistencia(id);
      },
      err => {
        Swal.fire({
          title: "Oops! hubo un problema",
          icon: "error",
          showCloseButton: false,
          showConfirmButton: false
        });
      }
    );
  }

  openDetail(id?: number): void {
    this.modal = new bootstrap.Modal(document.getElementById('detalleModal'), {
      keyboard: false
    })
    this.cargarAsistenciaForDetail(id);
    this.modal?.show();
  }

  cargarAsistenciaForDetail(id?: number): void {
    this._asistenciaService.detail(id).subscribe(
      data => {
        this.asistencia = data;
      },
      err => {
        alert(err.error.mensaje);
        this.volver();
      }
    );
  }

  volver(): void {
    this.modal?.hide();
    this.router.navigate(['mis-asistencias']);
  }

  close(): void {
    this.modal.hide();
  }

}
