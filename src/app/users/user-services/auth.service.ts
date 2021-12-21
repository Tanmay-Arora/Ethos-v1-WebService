import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { Otp } from '../model/otp';
import { UserAuth } from '../model/user-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _authApiService: AuthApiService, private router: Router, private _sessionStorage: LocalstorageService) { }

  registered:boolean = false;
  loggedIn:boolean = false;
  authError:boolean = false;
  AuthMessage = '';

  register(input_name:string, input_email:string, input_phone:string, input_password:string){
    const user: UserAuth = {
      name: input_name,
      email: input_email,
      phone: input_phone,
      password: input_password,
      token: ''
    }

    this._authApiService.register(user).subscribe(
      (data) => {
        console.log(data),
        this.registered = true;
        
      },
      (error) => {
        this.registered = false;
        console.log(error); 
      }
    )
  }

  login(phone:string, password:string){
    this._authApiService.login(phone, password).subscribe(
      (data) => {
        this.loggedIn = true;
        this.authError = false;
        console.log(data);
        this._sessionStorage.setInStorage('user',data);
        this._sessionStorage.setInStorage('loginState', {'state': `${this.loggedIn}`});
      },
      (err: HttpErrorResponse) => {
        this.loggedIn = false;
        if(err.status === 401){
          this.authError = true;
          this.AuthMessage = "Password is Wrong";
        }
        if(err.status === 404){
          this.authError = true;
          this.AuthMessage = "Email is Wrong";
        }
        if(err.status === 500){
          this.authError = true;
          this.AuthMessage = "Something went wrong!! Please try again";
        }
      }
    )
  }

  logout() {
    this._sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  sendOtp(phone: string) {
    this._authApiService.sendOtp(phone).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        this.authError = true;
        this.AuthMessage = "Something went wrong!! Please try again";
      }
    );
  }

  resetPassword(otp: string, password: string) {
    this._authApiService.resetpassword(otp, password).subscribe(
      (res) => {
        console.log(res);
        this.authError = false;
      },
      (err: HttpErrorResponse) => {
        if(err.status == 400){
          this.authError = true;
          this.AuthMessage = "Please Enter valid Details.";
        }
        else {
          this.authError = true;
          this.AuthMessage = "Something went Wrong";
        }
      }
    );
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  isRegistered(){
    return this.registered;
  }

}
