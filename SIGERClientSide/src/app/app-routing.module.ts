import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { LoginComponent } from './layouts/login/login.component';
import { RecoveryPasswordComponent } from './layouts/recovery-password/recovery-password.component';
import { HomeAdmComponent } from './layouts/home-adm/home-adm.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeAdmComponent},
  {path: 'login', component: LoginComponent},
  {path: 'recoveryPassword', component: RecoveryPasswordComponent},
  {path: 'estadoBoleta', component: ViewMainEstadoBoletaComponent},
  {path: 'estadoLicencia', component: ListaEstadoLicenciaComponent},
  {path: 'permisos', component: ListaPermisoComponent},
  {path: 'rol', component: ListaRolComponent},
  {path: 'rol/detalle/:id', component:DetalleRolComponent},
  {path: 'rol/nuevo', component: NuevoRolComponent},
  {path: 'rol/editar/:id', component: EditarRolComponent},
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
