import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layouts/login/login.component';
import { RecoveryPasswordComponent } from './layouts/recovery-password/recovery-password.component';
import { HttpClientModule } from '@angular/common/http';
import { ListaPermisoComponent } from './components/permiso/lista-permiso.component';
import { DetallePermisoComponent } from './components/permiso/detalle-permiso.component';
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
import { ViewMainEstadoBoletaComponent } from './components/estadoBoleta/view-main-estado-boleta.component';

import { FooterComponent } from './layouts/footer/footer.component';
import { VerticalnavbarComponent } from './layouts/verticalnavbar/verticalnavbar.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { HomeComponent } from './layouts/home/home.component';
import { ErrorsComponent } from './layouts/errors/errors.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecoveryPasswordComponent,
    ListaPermisoComponent,
    DetallePermisoComponent,
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
    NuevoProvinciaComponent,
    ViewMainEstadoBoletaComponent,
    FooterComponent,
    NavbarComponent,
    VerticalnavbarComponent,
    HomeComponent,
    ErrorsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
