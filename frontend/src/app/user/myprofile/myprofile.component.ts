import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServicesService } from '../../services/auth-services.service';
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css'],
})
export class MyprofileComponent implements OnInit {
  uploadform: any = FormGroup;
  user: any;
  imageList: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: AuthServicesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') as any);
    this.uploadform = this.formBuilder.group({
      image: ['', Validators.required],
    });
    this.showImage();

  }

  onImagechange(event: any) {
    // console.log('vghv', event.target.files[0]);
    const file = event.target.files[0];
    this.uploadform.patchValue({ image: file });
  }
  upload() {
    console.log('upload image', this.uploadform.value.image);
    let formData = new FormData();
    formData.append('image', this.uploadform.value.image);
    this.service.fileupload(formData).subscribe((response: any) => {
      console.log('image', response.data.result);
      this.toastr.success('Image Uploaded');
    });
  }
  loggedin() {
    return localStorage.getItem('user');
  }
  showImage() {
    this.service.getImage().subscribe((response: any) => {
      // console.log('Data Comming', response.data.image);
      this.imageList = response.data.result;
    });
  }
}
