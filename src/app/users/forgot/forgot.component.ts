import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../user-services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _authService: AuthService) { }

  ngOnInit(): void {
  }

  forgotForm = this.fb.group({
    phone: ['', Validators.required]
  });

  get phone() {
    return this.forgotForm.get('phone');
  }

  onSubmit(){
    console.log('Submitted');
    this._authService.sendOtp(this.phone?.value);
    setTimeout(() => {
      this.router.navigate(['../verify'], {relativeTo: this.route});
    }, 1000);
  }
}
