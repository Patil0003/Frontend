import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit , DoCheck{
  User: any = '';
  constructor(private router: Router, private toastr: ToastrService) {}
  ngOnInit(): void { }
  ngDoCheck(): void {
        let user: any = JSON.parse(localStorage.getItem('user') as any);
    // console.log("User",user)
    this.User = user.name;
    // console.log("This",this.User)
  }

  loggedin() {
    return localStorage.getItem('user');
  }
  logout() {
    localStorage.clear();
    this.toastr.info('User Logout');
    this.router.navigate(['/login']);
  }
}
