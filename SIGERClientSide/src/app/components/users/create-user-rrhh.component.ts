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
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { TipoDocumento } from 'src/app/models/tipo-documento';
import { RemuneracionService } from 'src/app/services/remuneracion.service';
import { Remuneracion } from 'src/app/models/remuneracion';
import { RegimenHorarioService } from 'src/app/services/regimen-horario.service';
import { RegimenHorario } from 'src/app/models/regimen-horario';
import { DatosGobArService } from 'src/app/services/datos-gob-ar.service';
import { Departamento } from 'src/app/models/departamento';
import { Provincia } from 'src/app/models/provincia';
import { Localidad } from 'src/app/models/localidad';
import { SectorService } from 'src/app/services/sector.service';
import { Sector } from 'src/app/models/sector';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-user-rrhh',
  templateUrl: './create-user-rrhh.component.html',
  styleUrls: ['./create-user-rrhh.component.css']
})
export class CreateUserRRHHComponent implements OnInit {

  roles: Rol[];
  nationalities: Nacionalidad[];
  success: boolean;
  existe: boolean;
  docTypes: TipoDocumento[];
  remuneraciones: Remuneracion[];
  regimenesHorario: RegimenHorario[];
  provincias: Provincia[];
  idProv: number;
  departamentos: Departamento[];
  idDpto: number;
  localidades: Localidad[];
  sectores: Sector[];
  faSearch = faSearch;
  alreadyExistPersonalEmail: boolean;
  alreadyExistDPVEmail: boolean;
  alreadyExistUserName: boolean;
  alreadyExistDocumentNumber: boolean;

  newUserForm: FormGroup;

  @ViewChild('SpecialRole') specialRole: ElementRef;

  constructor(private _role: RolService,
    private _nationality: NacionalidadService,
    //private renderer: Renderer2,
    private _formBuilder: FormBuilder,
    private _employee: EmpleadoService,
    private _docType: TipoDocumentoService,
    private _remun: RemuneracionService,
    private _regimenH: RegimenHorarioService,
    private _datosGob: DatosGobArService,
    private _sector: SectorService,
    private _auth: AuthService
  ) {
    this.instantiateForm();
    this.getRoles();
    this.getNationality();
    this.getDocType();
    this.getRemuneracion();
    this.getRegimenHorario();
    this.getProvincias();
    this.getSector();

  }

  ngOnInit(): void {
  }

  instantiateForm(): void {

    this.newUserForm = this._formBuilder.group({
      firstname: ['', [Validators.required, Validators.maxLength(30)]],
      surname: ['', [Validators.required, Validators.maxLength(30)]],
      dni: ['', [Validators.required, Validators.maxLength(10)]],
      docType: [0, [Validators.required]],
      yearOfstarted: ['', [Validators.required]],
      personalEmail: ['', [Validators.required, Validators.email]],
      DPVEmail: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.maxLength(30)]],
      nationalitySelected: [0, Validators.required],
      specialRoleSelected: [0, [Validators.required]],
      remuneraciones: [0, [Validators.required]],
      regimenesHorario: [0, [Validators.required]],
      provincia: [0],
      departamento: [0],
      localidad: [0],
      calle: [''],
      nroCalle: [''],
      nroPiso: [''],
      nroDepartamento: [''],
      sector: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      nroTelefonoCelular: ['']
    });

  }

  getSector(): void {
    this._sector.list(0).subscribe(data => {
      this.sectores = data;
    }, err => {
      console.log(err);
    })
  }

  existUsuario(username: string): void {
    this._auth.existByUsername(username).subscribe(
      data => {
        console.log(data);
        if (data) {
          Swal.fire({
            title: "El nombre de usuario ya existe",
            icon: "error",
            showCloseButton: false,
            showConfirmButton: false
          });
        } else {
          Swal.fire({
            title: "El nombre de usuario esta disponible",
            icon: "success",
            showCloseButton: false,
            showConfirmButton: false
          });
        }

      },
      err => {
        console.log(err);

      }
    )

  }

  getProvincias(): void {
    this._datosGob.listProvincias().subscribe(data => {
      this.provincias = data;
    }, err => {
      console.log(err);
    })
  }
  getDepartamentos(id: number): boolean {
    this.success = false;
    if (id == null) {
      Swal.fire({
        title: "Seleccione una Provincia",
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false
      });
      return this.success
    }
    this._datosGob.listDepartamentosByProvincia(id).subscribe(data => {
      this.success = true;
      this.departamentos = data;
    }, err => {

      console.log(err);
    })
    return this.success;
  }
  getLocalidades(id: number): boolean {
    this.success = false;
    if (id == null) {
      Swal.fire({
        title: "Seleccione un Departamento",
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false
      });
      return this.success
    }
    this._datosGob.listLocalidadesByDepartamento(id).subscribe(data => {
      this.success = true;
      this.localidades = data;
    }, err => {

      console.log(err);
    })
    return this.success;
  }
  getRemuneracion(): void {
    this._remun.page(0).subscribe(data => {
      this.remuneraciones = data;
    },
      err => {
        console.log(err);
      })
  }
  getRegimenHorario(): void {
    this._regimenH.page(0).subscribe(data => {
      this.regimenesHorario = data;
    },
      err => {
        console.log(err);
      })
  }
  getDocType(): void {
    this._docType.list().subscribe(data => {
      this.docTypes = data;
    }, err => {
      console.log(err);
    })
  }

  getNationality(): void {
    this._nationality.GetAll().subscribe(data => {
      this.nationalities = data;
    }, error => {
      console.log(error);
    })
  }

  getRoles(): void {
    this._role.list().subscribe(data => {
      data.forEach(rol => {
        if (rol.rolNombre.includes("ADMIN") || rol.rolNombre.includes("admin")) {
          rol.rolNombre = "Administrador";
        } else {
          if (rol.rolNombre.includes("USER") || rol.rolNombre.includes("user")) {
            rol.rolNombre = "Usuario";
          }
        }
      });
      this.roles = data;
    }, error => {
      console.log(error);
    })
  }

  OnCreate(): boolean {

    this.success = false;

    if (this.newUserForm.valid && this.IsOlder() && !this.alreadyExistPersonalEmail && 
    !this.alreadyExistDPVEmail && !this.alreadyExistUserName && !this.alreadyExistDocumentNumber /*&& !this.YearOfstartedIsOlder()*/) {
      const account: Usuario = {
        nombre: this.newUserForm.get('username')?.value,
        username: this.newUserForm.get('username')?.value,
        correoInstitucional: this.newUserForm.get('DPVEmail')?.value,
        enabled: true,
        isFirstSignin: true,
        password: '',
        image: "",
        recordarme: false,
        roles: this.newUserForm.get('specialRoleSelected')?.value,
        id: null
      }

      const employee: Empleado = {
        nombre: this.newUserForm.get('firstname')?.value,
        apellido: this.newUserForm.get('surname')?.value,
        nacionalidad: this.newUserForm.get('nationalitySelected')?.value,
        correoPersonal: this.newUserForm.get('personalEmail')?.value,
        fechaIngreso: this.newUserForm.get('yearOfstarted')?.value,
        computoDiasLicencia: null,
        diasLicenciaAnualFija: null,
        domicilio: {
          calle: this.newUserForm.get('calle')?.value,
          nroCalle: this.newUserForm.get('nroCalle')?.value,
          nroDepartamento: this.newUserForm.get('nroDepartamento')?.value,
          nroPiso: this.newUserForm.get('nroPiso')?.value,
          barrio: '',
          casa: '',
          manzana: '',
          provincia: this.newUserForm.get('provincia')?.value,
          departamento: this.newUserForm.get('departamento')?.value,
          localidad: this.newUserForm.get('localidad')?.value
        },
        esEncargado: false,
        estadoCivil: null,
        fechaLimiteReemplazo: null,
        fechaNacimiento: this.newUserForm.get('fechaNacimiento')?.value,
        sector: this.newUserForm.get('sector')?.value,
        legajo: null,
        nroTelefonoCelular: this.newUserForm.get('nroTelefonoCelular')?.value,
        nroTelefonoFijo: null,
        planillas: null,
        puedeAprobarRequerimiento: null,
        regimenHorario: this.newUserForm.get('regimenesHorario')?.value,
        remanenteDiasLicencias: null,
        remuneracion: this.newUserForm.get('remuneraciones')?.value,
        rompeReglaComisionDia: null,
        rompeReglaFichadaReloj: null,
        rompeReglaFichadaSupervisor: null,
        usuario: account,
        id: null,
        documentoIdentidad: {
          nroIdentidad: this.newUserForm.get('dni')?.value,
          tipoDocumento: this.newUserForm.get('docType')?.value
        },
        fechaAlta: undefined,
        fechaBaja: undefined,
        cuil: '',
        nroIdentificacionPersonal: ''
      }
      this._employee.save(employee).subscribe(data => {

        Swal.fire({
          title: "Usuario creado",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });

        this.instantiateForm();

      }, err => {

        console.log(err);

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

  IsOlder(): boolean {
    var isOlder: boolean;
    if (new Date().getFullYear() - new Date(this.newUserForm.get('fechaNacimiento')?.value).getFullYear() < 18) {
      isOlder = false;
    } else {
      isOlder = true;
    }

    return isOlder;
  }

  YearOfstartedIsOlder(): boolean{
    
    var YearOfstartedIsOlder: boolean;
    if (new Date() <= new Date(this.newUserForm.get('yearOfstarted')?.value)) {
      YearOfstartedIsOlder = true;
    } else {
      YearOfstartedIsOlder = false;
    }

    return YearOfstartedIsOlder;
  }

  async AlreadyExistPersonalEmail() {
    this.alreadyExistPersonalEmail = false;

    if (this.newUserForm.get('personalEmail')?.valid) {
      this.alreadyExistPersonalEmail = await this._employee.alreadyExistPersonalEmail(this.newUserForm.get('personalEmail')?.value).toPromise();
    }
  }

  async AlreadyExistDPVEmail() {

    this.alreadyExistDPVEmail = false;

    if (this.newUserForm.get('DPVEmail')?.valid) {
      this.alreadyExistDPVEmail = await this._employee.alreadyExistDPVEmail(this.newUserForm.get('DPVEmail')?.value).toPromise();
    }
  }

  async AlreadyExistDocumentNumber() {

    this.alreadyExistDocumentNumber = false;
    if (this.newUserForm.get('dni')?.valid && this.newUserForm.get('docType')?.value["id"] != 0) {
      this.alreadyExistDocumentNumber = await this._employee.alreadyExistDocumentNumber(this.newUserForm.get('dni')?.value, this.newUserForm.get('docType')?.value["id"]).toPromise();
    }
  }

  async AlreadyExisUserName() {

    this.alreadyExistUserName = false;

    if (this.newUserForm.get('username')?.valid) {
      this.alreadyExistUserName = await this._employee.alreadyExistUserName(this.newUserForm.get('username')?.value).toPromise();
    }
  }
}
