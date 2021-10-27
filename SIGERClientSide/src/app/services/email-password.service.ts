import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordDTO } from '../dto/change-password-dto';
import { EmailValuesDTO } from '../dto/email-values-dto';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})
export class EmailPasswordService extends connectionURL{

  constructor(private httpClient: HttpClient) {
    super();
   }

  public sendEmail(dto: EmailValuesDTO): Observable<any> {
    this.endpoint = "email-password/send-email"
    return this.httpClient.post<any>(this.app_url + this.endpoint, dto);
  }

  public changePassword(dto: ChangePasswordDTO): Observable<any> {
    this.endpoint = "email-password/change-password"
    return this.httpClient.post<any>(this.app_url + this.endpoint, dto);
  }
}
