import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServicesService } from '../../services/auth-services.service';
import Swal from 'sweetalert2';
import { BnNgIdleService } from 'bn-ng-idle';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  simpleAlert() {
    // Swal.fire('Login Successfully');
  }
  loginForm!: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: AuthServicesService,
    private bnIdle: BnNgIdleService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  login(form: any) {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.service.login(form).subscribe((response: any) => {
      if (response) {
        // console.log("login",response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem(
          'todoArray',
          JSON.stringify(response.data.result.todoArray)
        );
        Swal.fire('Login Success');
        //session-management
        this.bnIdle.startWatching(10).subscribe((isTimeOut: Boolean) => {
          if (isTimeOut) {
            // console.log('Session Expired');
            localStorage.removeItem('user');
            localStorage.removeItem('todoArray');
            this.router.navigate(['/login']);
            this.bnIdle.stopTimer();
            Swal.fire('Session Expiry. User Logout');
          }
        });

        this.router.navigate(['']);
      } else {
        Swal.fire('Login Failed');
      }
    });
  }
}
//
