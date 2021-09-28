import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleEstadoBoletaComponent } from './components/estadoBoleta/detalle-estado-boleta.component';
import { EditarEstadoBoletaComponent } from './components/estadoBoleta/editar-estado-boleta.component';
import { ListaEstadoBoletaComponent } from './components/estadoBoleta/lista-estado-boleta.component';
import { NuevoEstadoBoletaComponent } from './components/estadoBoleta/nuevo-estado-boleta.component';
import { ListaEstadoLicenciaComponent } from './components/estadoLicencia/lista-estado-licencia.component';
import { DetallePermisoComponent } from './components/permiso/detalle-permiso.component';
import { EditarPermisoComponent } from './components/permiso/editar-permiso.component';
import { ListaPermisoComponent } from './components/permiso/lista-permiso.component';
import { NuevoPermisoComponent } from './components/permiso/nuevo-permiso.component';
import { DetalleProvinciaComponent } from './components/provincia/detalle-provincia.component';
import { EditarProvinciaComponent } from './components/provincia/editar-provincia.component';
import { ListaProvinciaComponent } from './components/provincia/lista-provincia.component';
import { NuevoProvinciaComponent } from './components/provincia/nuevo-provincia.component';
import { DetalleRolComponent } from './components/rol/detalle-rol.component';
import { EditarRolComponent } from './components/rol/editar-rol.component';
import { ListaRolComponent } from './components/rol/lista-rol.component';
import { NuevoRolComponent } from './components/rol/nuevo-rol.component';
import { LoginComponent } from './layouts/login/login.component';
import { RecoveryPasswordComponent } from './layouts/recovery-password/recovery-password.component';

const routes: Routes = [
  {path: 'recoveryPassword', component: RecoveryPasswordComponent},
  {path: 'estadoBoleta', component: ListaEstadoBoletaComponent},
  {path: 'estadoBoleta/detalle/:id', component: DetalleEstadoBoletaComponent},
  {path: 'estadoBoleta/nuevo', component: NuevoEstadoBoletaComponent},
  {path: 'estadoBoleta/editar/:id', component: EditarEstadoBoletaComponent},
  {path: 'estadoLicencia', component: ListaEstadoLicenciaComponent},
  {path: 'permiso', component: ListaPermisoComponent},
  {path: 'permiso/detalle/:id', component:DetallePermisoComponent},
  {path: 'permiso/nuevo', component: NuevoPermisoComponent},
  {path: 'permiso/editar/:id', component: EditarPermisoComponent},
  {path: 'rol', component: ListaRolComponent},
  {path: 'rol/detalle/:id', component:DetalleRolComponent},
  {path: 'rol/nuevo', component: NuevoRolComponent},
  {path: 'rol/editar/:id', component: EditarRolComponent},
  {path: 'provincia', component: ListaProvinciaComponent},
  {path: 'provincia/detalle/:id', component:DetalleProvinciaComponent},
  {path: 'provincia/nuevo', component: NuevoProvinciaComponent},
  {path: 'provincia/editar/:id', component: EditarProvinciaComponent},
  {path: '**', component: LoginComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
