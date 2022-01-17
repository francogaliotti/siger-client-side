import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Nacionalidad } from 'src/app/models/nacionalidad';
import { Rol } from 'src/app/models/rol';
import { NacionalidadService } from 'src/app/services/nacionalidad.service';
import { RolService } from 'src/app/services/rol.service';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import Swal from 'sweetalert2';
import { data } from 'jquery';

@Component({
  selector: 'app-create-user-rrhh',
  templateUrl: './create-user-rrhh.component.html',
  styleUrls: ['./create-user-rrhh.component.css']
})
export class CreateUserRRHHComponent implements OnInit {

  roles: Rol[];
  nationalities: Nacionalidad[];
  success: boolean;

  newUserForm : FormGroup;

  @ViewChild('SpecialRole') specialRole : ElementRef;

  constructor(private _role: RolService, 
    private _nationality: NacionalidadService, 
    private renderer: Renderer2, 
    private _formBuilder: FormBuilder,
    private _employee: EmpleadoService) {
    this.instantiateForm(); 
    this.getRoles();
    this.getNationality();

    
  }

  ngOnInit(): void {
  }

  instantiateForm(): void{

    this.newUserForm = this._formBuilder.group({
      firstname: ['', [Validators.required, Validators.maxLength(30)]],
      surname: ['',[Validators.required, Validators.maxLength(30)]],
      dni: ['', [Validators.required, Validators.maxLength(10)]],
      yearOfstarted: ['', [Validators.required, Validators.maxLength(4)]],
      personalEmail: ['', [Validators.required,Validators.email]],
      DPVEmail: ['',[Validators.required, Validators.email]],
      username: ['',[Validators.required, Validators.maxLength(30)]],
      needSpecialRole: [false],
      nationalitySelected: [0, Validators.required],
      specialRoleSelected: [0]
    });

    this.newUserForm.get('specialRoleSelected').disable();
  } 

  getNationality(): void{
    this._nationality.GetAll().subscribe(data => {
      this.nationalities = data;;
    }, error => {
      console.log(error);
    })
  }

  getRoles(): void{
    this._role.list().subscribe(data => {
      this.roles = data;
    }, error => {
      console.log(error);
    })
  }

  EnableSpecialRole(): void{
    if ($('#needSpecialRole').is(':checked')) {
      this.renderer.setProperty(this.specialRole.nativeElement, 'disabled', false);
    } else {
      this.renderer.setProperty(this.specialRole.nativeElement, 'disabled', true);
    }
  }

  OnCreate(): boolean{

    this.success = false;

    if(this.newUserForm.valid){

      const nationality: Nacionalidad = {
        id: this.newUserForm.get('nationalitySelected')?.value,
        nombre: ''
      }

      const account: Usuario = {
        username: this.newUserForm.get('username')?.value,
        correoInstitucional: this.newUserForm.get('DPVEmail')?.value,
        enabled: true,
        esPrimerInicio: true,
        password: '',
        recordarme: false,
        requiereAutorizacion: this.newUserForm.get('needSpecialRole')?.value,
        rolNecesario: this.newUserForm.get('specialRoleSelected').value,
        roles: [],
        id: null
      }

      const employee: Empleado = {
        nombre: this.newUserForm.get('firstname')?.value,
        apellido: this.newUserForm.get('surname')?.value,
        nacionalidad: nationality,
        correoPersonal: this.newUserForm.get('personalEmail')?.value,
        fechaIngreso: this.newUserForm.get('yearOfstarted')?.value,
        computoDiasLicencia: null,
        diasLicenciaAnualFija: null,
        domicilio: null,
        esEncargado: false,
        estadoCivil: null,
        fechaLimiteReemplazo: null,
        fechaNacimiento: null,
        historialSectorEmpleado: null,
        legajo: null,
        nroTelefonoCelular: null,
        nroTelefonoFijo: null,
        planillas: null,
        puedeAprobarRequerimiento: null,
        regimenesHorario: null,
        remanenteDiasLicencia: null,
        remuneraciones: null,
        rompeReglaComisionDia: null,
        rompeReglaFichadaReloj: null,
        rompeReglaFichadaSupervisor: null,
        usuario: account,
        id: null,
        documentoIdentidad: []
      }

      console.log(employee);

      this._employee.save(employee).subscribe(data => {

        Swal.fire({
          title: "Éxito",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });

        this.instantiateForm();

      }, error => {

          console.log(console.error());

          Swal.fire({
            title: "Oops! hubo un problema",
            icon: "error",
            showCloseButton: false,
            showConfirmButton: false
          });
      })
    }

    return this.success;
  }
}
