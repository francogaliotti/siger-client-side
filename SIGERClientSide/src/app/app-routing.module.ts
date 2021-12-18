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
import { TipoLicenciaComponent } from './components/tipo-licencia/tipo-licencia.component';
import { LoginGuard } from './guards/login.guard';
import { ChangePasswordComponent } from './components/changepassword/change-password.component';
import { TipoBoletaGuardService as tipoBoletaGuard} from './guards/tipo-boleta-guard.service';
import { EstadoBoletaComponent } from './components/estado-boleta/estado-boleta/estado-boleta.component';
import { ListaEstadoLicenciaComponent } from './components/estado-licencia/estado-licencia/estado-licencia.component';
import { ZonaInhospitaComponent } from './components/zona-inhospita/zona-inhospita/zona-inhospita.component';
import { ViewMainViaticoComponent } from './components/viatico/viatico/viatico.component';
import { ViewMainTipoBoletaComponent } from './components/tipo-boleta/tipo-boleta/tipo-boleta.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeAdmComponent},
  {path: 'login', component: LoginComponent},
  {path: 'recoveryPassword', component: RecoveryPasswordComponent, canActivate: [LoginGuard]},
  {path: 'change-password/:tokenPassword', component: ChangePasswordComponent, canActivate: [LoginGuard]},
  {path: 'estado-boleta', component: EstadoBoletaComponent, canActivate: [estadoBoletaGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'estado-licencia', component: ListaEstadoLicenciaComponent, canActivate: [estadoLicenciaGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'tipoLicencia', component: TipoLicenciaComponent},
  {path: 'zona-inhospita', component: ZonaInhospitaComponent, canActivate: [zonaInhospitaGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'viatico', component: ViewMainViaticoComponent, canActivate: [ViaticoGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'permisos', component: ListaPermisoComponent},
  {path: 'roles', component: IndexRolComponent},
  {path: 'tipo-boleta', component: ViewMainTipoBoletaComponent, canActivate:  [tipoBoletaGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: '**', component: ErrorsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
