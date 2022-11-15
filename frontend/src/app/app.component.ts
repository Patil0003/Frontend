import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // simpleAlert() {
  //   Swal.fire('Loading..');
  // }
  title = 'todolist';
  User: any;
  constructor(private router: Router, private toastr: ToastrService) {}
  ngOnInit(): void {
    // this.User = JSON.parse(localStorage.getItem('user') as any);
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
