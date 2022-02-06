/*import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentoIdentidad } from 'src/app/models/documentoidentidad';
import { Domicilio } from 'src/app/models/domicilio';
import { Empleado } from 'src/app/models/empleado';
import { Usuario } from 'src/app/models/usuario';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit {

  editEmployeeProfile: FormGroup;
  employee: Empleado;


  constructor(private _formBuilder: FormBuilder, private _token: TokenService, private _employees: EmpleadoService) {
    //this.getEmployee();

    this.editEmployeeProfile = this._formBuilder.group({
      firstname: ['', [Validators.required, Validators.maxLength(40)]],
      lastname: ['', [Validators.required, Validators.maxLength(40)]],
      nationality: [0, Validators.required],
      personalEmail: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      dpvEmail: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      username: ['', [Validators.required, Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.maxLength(30)]],
      neighborhood: ['', Validators.maxLength(30)],
      floor: ['', Validators.maxLength(4)],
      block: ['', Validators.maxLength(3)],
      street: ['', Validators.maxLength(50)],
      house: ['', Validators.maxLength(3)],
      height: ['', Validators.maxLength(6)],
      apartment: ['', Validators.maxLength(3)],
      IdentityCardNumber: ['', Validators.required],
      typeOfIdentityCard: [0, Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      mobilePhoneNumber: ['', Validators.required],
      locality: [0, Validators.required],
      province: [0, Validators.required]
    });
  }

  ngOnInit(): void {

  }

  getEmployee(): void {
    this._employees.getByUserName(this._token.getUsername()).subscribe(data => {
      this.employee = data;
    }, error => {
      console.log(error);
    });
  }

  loadForm(): void {
    this.editEmployeeProfile = this._formBuilder.group({
      firstname: [this.employee.nombre, [Validators.required, Validators.maxLength(40)]],
      lastname: [this.employee.apellido, [Validators.required, Validators.maxLength(40)]],
      nationality: [this.employee.nacionalidad, Validators.required],
      personalEmail: [this.employee.correoPersonal, [Validators.required, Validators.email, Validators.maxLength(150)]],
      password: [this.employee.usuario.password, [Validators.required, Validators.maxLength(30)]],
      neighborhood: [this.employee.domicilio.barrio, Validators.maxLength(30)],
      floor: [this.employee.domicilio.nroPiso, Validators.maxLength(4)],
      block: [this.employee.domicilio.manzana, Validators.maxLength(3)],
      street: [this.employee.domicilio.calle, Validators.maxLength(50)],
      house: [this.employee.domicilio.casa, Validators.maxLength(3)],
      height: [this.employee.domicilio.nroCalle, Validators.maxLength(6)],
      apartment: [this.employee.domicilio.nroDepartamento, Validators.maxLength(3)],
      IdentityCardNumber: ['', Validators.required],
      typeOfIdentityCard: [0, Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      mobilePhoneNumber: ['', Validators.required],
      locality: ['', Validators.required],
      province: ['', Validators.required]
    });
  }

  editProfile(): void {
    var success: boolean = false;

  

      //to do add location

      const address: Domicilio = {
        calle: this.editEmployeeProfile.get('street').value,
        nroCalle: this.editEmployeeProfile.get('height').value,
        nroDepartamento: this.editEmployeeProfile.get('apartment').value,
        nroPiso: this.editEmployeeProfile.get('floor').value,
        barrio: this.editEmployeeProfile.get('neighborhood').value,
        manzana: this.editEmployeeProfile.get('block').value,
        casa: this.editEmployeeProfile.get('house').value,
        localidad: this.editEmployeeProfile.get('locality').value,
        provincia: this.editEmployeeProfile.get('province').value,
        departamento: null
      };

      const identityCard: DocumentoIdentidad = {
        nroIdentidad: this.editEmployeeProfile.get('IdentityCardNumber').value,
        tipoDocumento: this.editEmployeeProfile.get('typeOfIdentityCard').value
      };

      const dpvUser: Usuario = {
        username: this.employee.usuario.username,
        password: this.editEmployeeProfile.get('password').value,
        correoInstitucional: this.employee.usuario.correoInstitucional,
        //rolNecesario: '',
        //esPrimerInicio: false,
        enabled: true,
        //requiereAutorizacion: false,
        recordarme: false,
        roles: [],
        nombre: '',
        image: '',
        isFirstSignin: false
      };

      // to do add number phone and identity card and its type

      const employeeEdited: Empleado = {
        apellido: this.editEmployeeProfile.get('lastname').value,
        nombre: this.editEmployeeProfile.get('firstname').value,
        nacionalidad: this.editEmployeeProfile.get('nationality').value,
        correoPersonal: this.editEmployeeProfile.get('personalEmail').value,
        estadoCivil: 0,
        legajo: 0,
        fechaLimiteReemplazo: undefined,
        fechaNacimiento: this.editEmployeeProfile.get('dateOfBirth').value,
        diasLicenciaAnualFija: 0,
        fechaIngreso: undefined,
        rompeReglaComisionDia: false,
        rompeReglaFichadaReloj: false,
        puedeAprobarRequerimiento: false,
        rompeReglaFichadaSupervisor: false,
        esEncargado: false,
        nroTelefonoFijo: this.editEmployeeProfile.get('phoneNumber').value,
        nroTelefonoCelular: this.editEmployeeProfile.get('mobilePhoneNumber').value,
        remuneraciones: null,
        regimenesHorario: null,
        usuario: dpvUser,
        domicilio: address,
        historialSectorEmpleado: null,
        planillas: null,
        computoDiasLicencia: null,
        remanenteDiasLicencia: null,
        documentoIdentidad: null
      };

      console.log(employeeEdited);

      this._employees.save(employeeEdited).subscribe(data => {
        Swal.fire({
          title: "Éxito",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
      }, error => {
        console.log(error);

        Swal.fire({
          title: "Oops! hubo un problema",
          icon: "error",
          showCloseButton: false,
          showConfirmButton: false
        });
      })
    }
  


}*/
