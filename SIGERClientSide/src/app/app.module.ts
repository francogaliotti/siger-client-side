import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecoveryPasswordComponent } from './layouts/recovery-password/recovery-password.component';
import { HttpClientModule } from '@angular/common/http';
import { ListaPermisoComponent } from './components/permiso/lista-permiso.component';
import { EditarPermisoComponent } from './components/permiso/editar-permiso.component';
import { ListaEstadoLicenciaComponent } from './components/estadoLicencia/lista-estado-licencia.component';
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
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RegisterComponent } from './auth/register.component';
import { LoginComponent } from './auth/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecoveryPasswordComponent,
    ListaPermisoComponent,
    EditarPermisoComponent,
    ListaEstadoLicenciaComponent,
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
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    SweetAlert2Module.forRoot(),
    SweetAlert2Module,
    SweetAlert2Module.forChild()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
