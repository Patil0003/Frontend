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
  imageData: any = [];
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
    var email:any = localStorage.getItem("email");
    // console.log(email)
    
    let formData = new FormData();
    formData.append('file', this.uploadform.value.image);
    formData.append("email", email)
    this.service.fileupload(formData).subscribe((response: any) => {
      // console.log('image', response.data.result);
      this.toastr.success('Image Uploaded');
      this.showImage()
    });
  }
  loggedin() {
    return localStorage.getItem('user');
  }
  showImage() {
    this.imageData = []
    this.service.getImage().subscribe((response: any) => {
      // console.log('Data Comming', response.data.image);
      let imgD = response.data.result;     
      this.imageData.push(imgD.pop()); 
      
  
      
    });
  }
}
