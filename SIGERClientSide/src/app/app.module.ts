import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layouts/login/login.component';
import { RecoveryPasswordComponent } from './layouts/recovery-password/recovery-password.component';
import { HttpClientModule } from '@angular/common/http';
import { ListaEstadoBoletaComponent } from './components/estadoBoleta/lista-estado-boleta.component';
import { DetalleEstadoBoletaComponent } from './components/estadoBoleta/detalle-estado-boleta.component';
import { NuevoEstadoBoletaComponent } from './components/estadoBoleta/nuevo-estado-boleta.component';
import { EditarEstadoBoletaComponent } from './components/estadoBoleta/editar-estado-boleta.component';
import { ListaPermisoComponent } from './components/permiso/lista-permiso.component';
import { DetallePermisoComponent } from './components/permiso/detalle-permiso.component';
import { NuevoPermisoComponent } from './components/permiso/nuevo-permiso.component';
import { EditarPermisoComponent } from './components/permiso/editar-permiso.component';
import { ListaEstadoLicenciaComponent } from './components/estadoLicencia/lista-estado-licencia.component';
import { DetalleEstadoLicenciaComponent } from './components/estadoLicencia/detalle-estado-licencia.component';
import { NuevoEstadoLicenciaComponent } from './components/estadoLicencia/nuevo-estado-licencia.component';
import { EditarEstadoLicenciaComponent } from './components/estadoLicencia/editar-estado-licencia.component';
import { ListaRolComponent } from './components/rol/lista-rol.component';
import { DetalleRolComponent } from './components/rol/detalle-rol.component';
import { EditarRolComponent } from './components/rol/editar-rol.component';
import { NuevoRolComponent } from './components/rol/nuevo-rol.component';
import { ListaProvinciaComponent } from './components/provincia/lista-provincia.component';
import { DetalleProvinciaComponent } from './components/provincia/detalle-provincia.component';
import { EditarProvinciaComponent } from './components/provincia/editar-provincia.component';
import { NuevoProvinciaComponent } from './components/provincia/nuevo-provincia.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecoveryPasswordComponent,
    ListaEstadoBoletaComponent,
    DetalleEstadoBoletaComponent,
    NuevoEstadoBoletaComponent,
    EditarEstadoBoletaComponent,
    ListaPermisoComponent,
    DetallePermisoComponent,
    NuevoPermisoComponent,
    EditarPermisoComponent,
    ListaEstadoLicenciaComponent,
    DetalleEstadoLicenciaComponent,
    NuevoEstadoLicenciaComponent,
    EditarEstadoLicenciaComponent,
    ListaRolComponent,
    DetalleRolComponent,
    EditarRolComponent,
    NuevoRolComponent,
    ListaProvinciaComponent,
    DetalleProvinciaComponent,
    EditarProvinciaComponent,
    NuevoProvinciaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
