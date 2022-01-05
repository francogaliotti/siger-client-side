import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { ListaPermisoComponent } from './components/permiso/lista-permiso.component';
import { IndexRolComponent } from './components/rol/index-rol.component';
import { ErrorsComponent } from './layouts/errors/errors.component';
import { HomeComponent } from './layouts/home/home.component';
import { RecoveryPasswordComponent } from './layouts/recovery-password/recovery-password.component';
import { HomeAdmComponent } from './layouts/home-adm/home-adm.component';
import { EstadoBoletaGuardService as guard} from './guards/estado-boleta-guard.service';
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
import { SectorComponent } from './components/sector/sector.component';
import { SectorGuardService as sectorGuard} from './guards/sector-guard.service';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeAdmComponent},
  {path: 'login', component: LoginComponent},
  {path: 'recoveryPassword', component: RecoveryPasswordComponent, canActivate: [LoginGuard]},
  {path: 'change-password/:tokenPassword', component: ChangePasswordComponent, canActivate: [LoginGuard]},
  {path: 'estado-boleta', component: EstadoBoletaComponent, canActivate: [estadoBoletaGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'estado-licencia', component: EstadoLicenciaComponent, canActivate: [estadoLicenciaGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'tipo-licencia', component: TipoLicenciaComponent, canActivate:  [tipoLicenciaGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'zona-inhospita', component: ZonaInhospitaComponent, canActivate: [zonaInhospitaGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'viatico', component: ViaticoComponent, canActivate: [ViaticoGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'permisos', component: ListaPermisoComponent},
  {path: 'roles', component: IndexRolComponent},
  {path: 'tipo-boleta', component: TipoBoletaComponent, canActivate:  [tipoBoletaGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'movilidad', component: MovilidadComponent, canActivate: [movilidadGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'tipo-movilidad', component: TipoMovilidadComponent, canActivate: [tipoMovilidadGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'altaEmpleado', component: CreateUserRRHHComponent, canActivate: [EmpleadoGuard], data: {expectedRol: ['admin']}},
  {path: 'sector', component: SectorComponent, canActivate: [sectorGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: '**', component: ErrorsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
