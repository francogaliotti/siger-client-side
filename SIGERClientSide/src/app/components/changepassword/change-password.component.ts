import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordDTO } from 'src/app/dto/change-password-dto';
import { EmailPasswordService } from 'src/app/services/email-password.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})

export class ChangePasswordComponent implements OnInit {

  password: string;
  confirmPassword: string;
  tokenPassword: string;

  dto: ChangePasswordDTO;

  constructor(
    private _emailPasswordService: EmailPasswordService,  
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.ChangeBody();
  }

  ngOnInit() {
  }

  ChangeBody(){
    document.body.style.backgroundImage = "url('assets/images/Login2.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
  }

  onChangePassword(): void {
    if(this.password !== this.confirmPassword) {
      Swal.fire({
        title: "Las contraseñas no coinciden",
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false
      });
      return;
    }
    this.tokenPassword = this.activatedRoute.snapshot.params.tokenPassword;
    this.dto = new ChangePasswordDTO(this.password, this.confirmPassword, this.tokenPassword);
    this._emailPasswordService.changePassword(this.dto).subscribe(
      data => {
        Swal.fire({
          title: "Éxito",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
        this.router.navigate(['/login']);
    },
    err => {
      Swal.fire({
        title: "Oops! hubo un problema",
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false
      });
    }
    );
  }

}