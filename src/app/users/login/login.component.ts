import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../user-services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _authService: AuthService) { }

  ngOnInit(): void {
  }

  loginForm = this.fb.group({
    phone: ['', Validators.required],
    password: ['', Validators.required]
  });


  get phone() {
    return this.loginForm.get('phone');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    console.log('Form Submitted');
    this._authService.login(this.phone?.value, this.password?.value);
    setTimeout(() => {
      if(this._authService.isLoggedIn()){
        this.router.navigate(['/home'], {relativeTo: this.route});
      }
    }, 1000);
  }

}
