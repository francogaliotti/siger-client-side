import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { ViewMainEstadoBoletaComponent } from './components/estadoBoleta/view-main-estado-boleta.component';
import { ListaEstadoLicenciaComponent } from './components/estadoLicencia/lista-estado-licencia.component';
import { ListaPermisoComponent } from './components/permiso/lista-permiso.component';
import { DetalleProvinciaComponent } from './components/provincia/detalle-provincia.component';
import { EditarProvinciaComponent } from './components/provincia/editar-provincia.component';
import { ListaProvinciaComponent } from './components/provincia/lista-provincia.component';
import { NuevoProvinciaComponent } from './components/provincia/nuevo-provincia.component';
import { IndexRolComponent } from './components/rol/index-rol.component';
import { ErrorsComponent } from './layouts/errors/errors.component';
import { HomeComponent } from './layouts/home/home.component';
import { RecoveryPasswordComponent } from './layouts/recovery-password/recovery-password.component';
import { HomeAdmComponent } from './layouts/home-adm/home-adm.component';
import { ZonaInhospitaComponent } from './components/zona-inhospita/zona-inhospita.component';
import { EstadoBoletaGuardService as guard} from './guards/estado-boleta-guard.service';
import { EstadoLicenciaGuardService as estadoLicenciaGuard} from './guards/estado-licencia-guard.service';
import { ZonaInhospitaGuardService as zonaInhospitaGuard} from './guards/zona-inhospita-guard.service';

import { EstadoBoletaGuardService as estadoBoletaGuard} from './guards/estado-boleta-guard.service';
import { ViewMainViaticoComponent } from './components/viatico/view-main-viatico.component';
import { ViaticoGuardService as ViaticoGuard} from './guards/viatico-guard.service';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeAdmComponent},
  {path: 'login', component: LoginComponent},
  {path: 'recoveryPassword', component: RecoveryPasswordComponent},
  {path: 'estadoBoleta', component: ViewMainEstadoBoletaComponent, canActivate: [estadoBoletaGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'estadoLicencia', component: ListaEstadoLicenciaComponent, canActivate: [estadoLicenciaGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'zonaInhospita', component: ZonaInhospitaComponent, canActivate: [zonaInhospitaGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'viatico', component: ViewMainViaticoComponent, canActivate: [ViaticoGuard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'permisos', component: ListaPermisoComponent},
  {path: 'roles', component: IndexRolComponent},
  {path: 'provincia', component: ListaProvinciaComponent},
  {path: 'provincia/detalle/:id', component:DetalleProvinciaComponent},
  {path: 'provincia/nuevo', component: NuevoProvinciaComponent},
  {path: 'provincia/editar/:id', component: EditarProvinciaComponent},
  {path: '**', component: ErrorsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
