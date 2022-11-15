import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServicesService } from '../../services/auth-services.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public signupForm: any = FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: AuthServicesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      image: ['', Validators.required],
    });
  }
  get f() {
    return this.signupForm.controls;
  }
  onImagechange(event: any) {
    const file = event.target.files[0];
    this.signupForm.patchValue({ image: file });
  }
  signup(form: any) {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }
    this.service.signup(form).subscribe((response: any) => {
      if (response.status == true) {
        console.log(response.status,"ddfg");
        this.toastr.success('User Register Successful!');
        this.router.navigate(['/login']);
      } else {
        this.toastr.error('Failed!');
      }
    });
  }
  // signup() {
  //   const formData = new FormData();
  //   formData.append('image', this.signupForm.get('image').value);
  //   formData.append('name', this.signupForm.get('name').value);
  //   formData.append('mobile', this.signupForm.get('mobile').value);
  //   formData.append('email', this.signupForm.get('email').value);
  //   formData.append('password', this.signupForm.get('password').value);
  //   this.submitted = true;

  //   if (this.signupForm.invalid) {
  //     return;
  //   }
  //   this.service.signup(formData).subscribe((response: any) => {
  //     if (response.status == true) {
  //       this.toastr.success('User Register Successful!');
  //       this.router.navigate(['/login']);
  //     } else {
  //       this.toastr.error('Failed!');
  //     }
  //   });
  // }
}
