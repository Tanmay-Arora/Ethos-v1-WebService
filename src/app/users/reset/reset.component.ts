import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../user-services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _authService: AuthService) { }

  ngOnInit(): void {
  }

  resetForm = this.fb.group({
    otp: ['', Validators.required],
    password: ['', Validators.required]
  });

  get password() {
    return this.resetForm.get('password');
  }

  get otp() {
    return this.resetForm.get('otp');
  }

  onSubmit() {
    console.log('Form Submitted');
    this._authService.resetPassword(this.otp?.value, this.password?.value);
    setTimeout(() => {
      this.router.navigate(['../login'], {relativeTo: this.route});
    }, 1000);
  }
  


}
