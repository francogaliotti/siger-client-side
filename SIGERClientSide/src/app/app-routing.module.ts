import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { ListaPermisoComponent } from './components/permiso/lista-permiso.component';
import { IndexRolComponent } from './components/rol/index-rol.component';
import { ErrorsComponent } from './layouts/errors/errors.component';
import { HomeComponent } from './layouts/home/home.component';
import { RecoveryPasswordComponent } from './layouts/recovery-password/recovery-password.component';
import { HomeAdmComponent } from './layouts/home-adm/home-adm.component';
import { EstadoLicenciaGuardService as estadoLicenciaGuard} from './guards/estado-licencia-guard.service';
import { ZonaInhospitaGuardService as zonaInhospitaGuard} from './guards/zona-inhospita-guard.service';
import { EstadoBoletaGuardService as estadoBoletaGuard} from './guards/estado-boleta-guard.service';
import { ViaticoGuardService as ViaticoGuard} from './guards/viatico-guard.service';
import { LoginGuard } from './guards/login.guard';  
import { ChangePasswordComponent } from './components/changepassword/change-password.component';  
import { TipoBoletaGuardService as tipoBoletaGuard } from './guards/tipo-boleta-guard.service';  
import { EstadoBoletaComponent } from './components/estado-boleta/estado-boleta.component';  
import { EstadoLicenciaComponent } from './components/estado-licencia/estado-licencia.component';  
import { TipoLicenciaComponent } from './components/tipo-licencia/tipo-licencia.component';  
import { ZonaInhospitaComponent } from './components/zona-inhospita/zona-inhospita.component';  
import { ViaticoComponent } from './components/viatico/viatico.component';  
import { TipoBoletaComponent } from './components/tipo-boleta/tipo-boleta.component';
import { TipoMovilidadComponent } from './components/tipo-movilidad/tipo-movilidad.component';
import { MovilidadComponent } from './components/movilidad/movilidad.component';
import { TipoLicenciaGuardService as tipoLicenciaGuard} from './guards/tipo-licencia-guard.service';
import { TipoMovilidadGuardService as tipoMovilidadGuard} from './guards/tipo-movilidad-guard.service';
import { MovilidadGuardService as movilidadGuard} from './guards/movilidad-guard.service';


import { CreateUserRRHHComponent } from './components/users/create-user-rrhh.component';  
import { EmpleadoGuardService as EmpleadoGuard } from './guards/empleado-guard.service';  
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { AsistenciaGuardService as AsistenciaGuard } from './guards/asistencia-guard.service';
import { SectorComponent } from './components/sector/sector.component';
import { SectorGuardService as sectorGuard} from './guards/sector-guard.service';
import { FirstSigninComponent } from './components/users/first-signin.component';
import { TipoRegimenHorarioComponent } from './components/tipo-regimen-horario/tipo-regimen-horario.component';
import { RegimenHorarioComponent } from './components/regimen-horario/regimen-horario.component';
import { RemuneracionComponent } from './components/remuneracion/remuneracion.component';
import { TipoSectorComponent } from './components/tipo-sector/tipo-sector.component';
import { TipoSectorGuardService as TipoSectorGuard} from './guards/tipo-sector-guard.service';
//import { EditUserProfileComponent } from './components/users/edit-user-profile.component';
import { SolicitarLicenciaComponent } from './components/solicitar-licencia/solicitar-licencia.component';
import { SolicitarLicenciaGuardService as solicitarLicenciaGuard} from './guards/solicitar-licencia-guard.service';
import { SolicitarBoletaComponent } from './components/solicitar-boleta/solicitar-boleta.component';
import { SolicitarBoletaGuardService as solicitarBoletaGuard} from './guards/solicitar-boleta-guard.service';
import { MisAsistenciasComponent } from './components/mis-asistencias/mis-asistencias.component';
import { AutorizarBoletaComponent } from './components/autorizar-boleta/autorizar-boleta.component';
import { AutorizarLicenciaComponent } from './components/autorizar-licencia/autorizar-licencia.component';
import { AutorizarLicenciaGuardService as autorizarLicenciaGuard} from './guards/autorizar-licencia-guard.service';
import { AutorizarBoletaGuardService as autorizarBoletaGuard} from './guards/autorizar-boleta-guard.service';
import { MyProfileComponent } from './layouts/my-profile/my-profile.component';
import { ListUsersComponent } from './components/users/list-users.component';
import { BoletasComponent } from './components/reports/boletas/boletas.component';
import { LicenciasComponent } from './components/reports/licencias/licencias.component';
import { ReporteBoletaGuardService as autorizarReporteBoletaGuard } from './guards/reporte-boleta-guard.service';
import { ReporteLicenciaGuardService as autorizarReporteLicenciaGuard } from './guards/reporte-licencia-guard.service';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeAdmComponent},
  {path: 'login', component: LoginComponent},
  {path: 'recovery-password', component: RecoveryPasswordComponent/*, canActivate: [LoginGuard]*/},
  {path: 'change-password/:tokenPassword', component: ChangePasswordComponent/*, canActivate: [LoginGuard]*/},
  {path: 'estado-boleta', component: EstadoBoletaComponent, canActivate: [estadoBoletaGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'estado-licencia', component: EstadoLicenciaComponent, canActivate: [estadoLicenciaGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'tipo-licencia', component: TipoLicenciaComponent, canActivate:  [tipoLicenciaGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'tipo-boleta', component: TipoBoletaComponent, canActivate:  [tipoBoletaGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'tipo-licencia', component: TipoLicenciaComponent},
  {path: 'tipo-regimen-horario', component: TipoRegimenHorarioComponent},
  {path: 'zona-inhospita', component: ZonaInhospitaComponent, canActivate: [zonaInhospitaGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'viatico', component: ViaticoComponent, canActivate: [ViaticoGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'permisos', component: ListaPermisoComponent},
  {path: 'roles', component: IndexRolComponent},
  {path: 'tipo-boleta', component: TipoBoletaComponent, canActivate:  [tipoBoletaGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'movilidad', component: MovilidadComponent, canActivate: [movilidadGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'tipo-movilidad', component: TipoMovilidadComponent, canActivate: [tipoMovilidadGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'regimen-horario', component: RegimenHorarioComponent},
  {path: 'remuneracion', component: RemuneracionComponent},
  {path: 'tipo-sector', component: TipoSectorComponent, canActivate: [TipoSectorGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'createEmployee', component: CreateUserRRHHComponent, canActivate: [EmpleadoGuard], data: {expectedRol: ['admin']}},
  //{path: 'editEmployeeProfile', component: EditUserProfileComponent},
  {path: 'altaEmpleado', component: CreateUserRRHHComponent, canActivate: [EmpleadoGuard], data: {expectedRol: ['admin']}},
  {path: 'asistencia', component: AsistenciaComponent, canActivate: [AsistenciaGuard], data: {expectedRol: ['admin']}},
  {path: 'mis-asistencias', component: MisAsistenciasComponent},
  {path: 'sector', component: SectorComponent, canActivate: [sectorGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'solicitar-licencia', component: SolicitarLicenciaComponent, canActivate: [solicitarLicenciaGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'solicitar-boleta', component: SolicitarBoletaComponent, canActivate: [solicitarBoletaGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'autorizar-boleta', component: AutorizarBoletaComponent, canActivate: [autorizarBoletaGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'autorizar-licencia', component: AutorizarLicenciaComponent, canActivate: [autorizarLicenciaGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'firstSignIn', component: FirstSigninComponent},
  {path: 'my-profile', component: MyProfileComponent},
  {path: 'list-users', component: ListUsersComponent},
  {path: 'BallotsReport', component: BoletasComponent, canActivate: [autorizarReporteBoletaGuard], data: { expectedRol: ['admin'] }},
  {path: 'PermissionsReport', component: LicenciasComponent, canActivate: [autorizarReporteLicenciaGuard], data: { expectedRol: ['admin'] }},
  {path: '**', component: ErrorsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
