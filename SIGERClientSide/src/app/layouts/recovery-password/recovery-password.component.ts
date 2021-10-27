import { Component, OnInit } from '@angular/core';
import { EmailValuesDTO } from 'src/app/dto/email-values-dto';
import { EmailPasswordService } from 'src/app/services/email-password.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {

  mailTo: string;
  dto: EmailValuesDTO;

  constructor(private _emailPasswordService: EmailPasswordService) { 
    this.ChangeBody();
  }

  ngOnInit(): void {
  }

  ChangeBody(){
    document.body.style.backgroundImage = "url('assets/images/Login2.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
  }

  onSendEmail(): void {
    this.dto = new EmailValuesDTO(this.mailTo);
    this._emailPasswordService.sendEmail(this.dto).subscribe(
      data => {
        Swal.fire({
          title: "Éxito",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false
        });
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
