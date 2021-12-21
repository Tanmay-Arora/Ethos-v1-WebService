import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuth } from '../model/user-auth';
import { Otp } from '../model/otp';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  url:string = 'http://localhost:8001';

  authResult!: Boolean;


  constructor(private http: HttpClient) { }

  register(user: UserAuth): Observable<UserAuth> {
    return this.http.post<UserAuth>(`${this.url}/users/register`, user);
  }

  login(phone:String, password:String): Observable<UserAuth> {
    return this.http.post<UserAuth>(`${this.url}/users/login`, {phone, password});
  }

  sendOtp(phone: string): Observable<Otp> {
    return this.http.post<Otp>(`${this.url}/users/forgot`, {phone});
  }

  resetpassword(otp: string, password: string): Observable<Otp> {
    return this.http.post<Otp>(`${this.url}/users/reset`, {otp, password});
  }


}
