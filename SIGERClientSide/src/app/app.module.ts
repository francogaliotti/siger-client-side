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
import { IndexRolComponent } from './components/rol/index-rol.component';
import { AddPermissionComponent } from './components/rol/add-permission.component';
import { EditRolComponent } from './components/rol/edit-rol.component';
import { RegisterComponent } from './auth/register.component';
import { LoginComponent } from './auth/login.component';
import { HomeAdmComponent } from './layouts/home-adm/home-adm.component';
import { ZonaInhospitaComponent } from './components/zona-inhospita/zona-inhospita.component';
import { ViaticoComponent } from './components/viatico/viatico.component';
import { TipoLicenciaComponent } from './components/tipo-licencia/tipo-licencia.component';
import { TipoBoletaComponent } from './components/tipo-boleta/tipo-boleta.component';
import { EstadoBoletaComponent } from './components/estado-boleta/estado-boleta.component';
import { EstadoBoletaPipe } from './pipes/estado-boleta.pipe';
import { EstadoLicenciaPipe } from './pipes/estado-licencia.pipe';
import { ZonaInhospitaPipe } from './pipes/zona-inhospita.pipe';
import { ViaticoPipe } from './pipes/viatico.pipe';
import { TipoBoletaPipe } from './pipes/tipo-boleta.pipe';
import { TipoLicenciaPipe } from './pipes/tipo-licencia.pipe';
import { CreateUserRRHHComponent } from './components/users/create-user-rrhh.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecoveryPasswordComponent,
    ListaPermisoComponent,
    EditarPermisoComponent,
    ListaEstadoLicenciaComponent,
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
    HomeAdmComponent,
    ZonaInhospitaComponent,
    IndexRolComponent,
    AddPermissionComponent,
    EditRolComponent,
    RegisterComponent,
    HomeAdmComponent,
    ViaticoComponent,
    TipoLicenciaComponent,
    ChangePasswordComponent,
    TipoBoletaComponent,
    EstadoBoletaComponent,
    EstadoBoletaPipe,
    EstadoLicenciaPipe,
    ZonaInhospitaPipe,
    ViaticoPipe,
    TipoBoletaPipe,
    TipoLicenciaPipe,
    CreateUserRRHHComponent
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
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }