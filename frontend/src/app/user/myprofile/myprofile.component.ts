import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css'],
})
export class MyprofileComponent implements OnInit {
  user: any;
  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') as any);
    console.log(this.user)
  }
  loggedin() {
    return localStorage.getItem('user');
  }
}
