import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {AuthServicesService} from '../../services/auth-services.service'
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  formGroup!:FormGroup;
  submitted =false;
  constructor( 
    private formBuilder: FormBuilder,
    private router: Router,
    private service: AuthServicesService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    // this.route.snapshot.paramMap.get('token');
    this.formGroup = this.formBuilder.group({
      new_password: ['', Validators.required],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]],

    });
  }
  get f() {
    return this.formGroup.controls;
  }
  resetForm(form: any) { 
//     this.submitted = true;    
//    if (this.formGroup.invalid) {
//      return;
//  }
   this.service.resetPassword(form).subscribe((response: any) => {
    console.log(response)
        if (response.status == true) {
       localStorage.setItem('token', JSON.stringify(response.result));;        
       this.toastr.success('b j  !');
       this.router.navigate(['']);
     } else {
       this.toastr.error(' hvhgvvj');
     }
   });
 }
}
