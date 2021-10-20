import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { ViewMainEstadoBoletaComponent } from './components/estadoBoleta/view-main-estado-boleta.component';
import { ListaEstadoLicenciaComponent } from './components/estadoLicencia/lista-estado-licencia.component';
import { EditarPermisoComponent } from './components/permiso/editar-permiso.component';
import { ListaPermisoComponent } from './components/permiso/lista-permiso.component';
import { DetalleProvinciaComponent } from './components/provincia/detalle-provincia.component';
import { EditarProvinciaComponent } from './components/provincia/editar-provincia.component';
import { ListaProvinciaComponent } from './components/provincia/lista-provincia.component';
import { NuevoProvinciaComponent } from './components/provincia/nuevo-provincia.component';
import { DetalleRolComponent } from './components/rol/detalle-rol.component';
import { EditarRolComponent } from './components/rol/editar-rol.component';
import { ListaRolComponent } from './components/rol/lista-rol.component';
import { NuevoRolComponent } from './components/rol/nuevo-rol.component';
import { ErrorsComponent } from './layouts/errors/errors.component';
import { HomeComponent } from './layouts/home/home.component';
import { RecoveryPasswordComponent } from './layouts/recovery-password/recovery-password.component';
import { HomeAdmComponent } from './layouts/home-adm/home-adm.component';
import { ZonaInhospitaComponent } from './components/zona-inhospita/zona-inhospita.component';
import { EstadoBoletaGuardService as guard} from './guards/estado-boleta-guard.service';
import { EstadoLicenciaGuardService } from './guards/estado-licencia-guard.service';
import { ZonaInhospitaGuardService } from './guards/zona-inhospita-guard.service';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeAdmComponent},
  {path: 'login', component: LoginComponent},
  {path: 'recoveryPassword', component: RecoveryPasswordComponent},
  {path: 'estadoBoleta', component: ViewMainEstadoBoletaComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'estadoLicencia', component: ListaEstadoLicenciaComponent},
  {path: 'zonaInhospita', component: ZonaInhospitaComponent},
  {path: 'permisos', component: ListaPermisoComponent},
  {path: 'rol', component: ListaRolComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'rol/detalle/:id', component:DetalleRolComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'rol/nuevo', component: NuevoRolComponent, canActivate: [guard], data: { expectedRol: ['admin'] }},
  {path: 'rol/editar/:id', component: EditarRolComponent, canActivate: [guard], data: { expectedRol: ['admin'] }},
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
