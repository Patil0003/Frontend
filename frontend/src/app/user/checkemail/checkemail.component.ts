import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {AuthServicesService} from '../../services/auth-services.service'

@Component({
  selector: 'app-checkemail',
  templateUrl: './checkemail.component.html',
  styleUrls: ['./checkemail.component.css'],
})
export class CheckemailComponent implements OnInit {
  emailverify!: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: AuthServicesService,
    private toastr: ToastrService,
  ) {}
  ngOnInit(): void {
    this.emailverify = this.formBuilder.group({
      email: [''],
    });

  }
  checkmail(form: any) {
    this.service.checkmail(form).subscribe((response: any) => {
      if (response.status == true) {
        this.toastr.success('OTP has send to your registered email address. Please Check!');
        // this.router.navigate(['/resetpassword']);
      } else {
        this.toastr.error('Failed!');
      }
    });
  }
}
