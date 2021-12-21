import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../user-services/auth.service';
import { PasswordValidator } from './password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _authService: AuthService) { }

  ngOnInit(): void {
  }

  signUpForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(7)]],
    confirmPassword: ['', Validators.required]
  }, {validator: PasswordValidator});

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get phone() {
    return this.signUpForm.get('phone');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  onSubmit() {
    console.log('Form Submitted');
      this._authService.register(this.name?.value, this.email?.value, this.phone?.value, this.password?.value);
      setTimeout(() => {
        if(this._authService.isRegistered()){
          this.router.navigate(['../login'], {relativeTo: this.route});
        }
  
      }, 1000);
       }

}
