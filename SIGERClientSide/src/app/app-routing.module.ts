import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layouts/login/login.component';
import { RecoveryPasswordComponent } from './layouts/recovery-password/recovery-password.component';
import { LoginService } from './services/login.service';

const routes: Routes = [
  {path: 'recoveryPassword', component: RecoveryPasswordComponent},
  {path: 'login', component: LoginService}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
