import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServicesService } from '../../services/auth-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  simpleAlert() {
    Swal.fire('Login Successfully');
  }
  loginForm!: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: AuthServicesService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
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
    this.spinner.show();
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.service.login(form).subscribe((response: any) => {
      if (response.status == true) {
        // console.log(response.result)
        localStorage.setItem('user', JSON.stringify(response.result));
        localStorage.setItem(
          'todoArray',
          JSON.stringify(response.result.todoArray)
        );
        setTimeout(() => {
          this.spinner.hide();

          this.router.navigate(['']);
        }, 1000);
      } else {
        this.toastr.error(' Login Failed!');
      }
    });
  }
}
