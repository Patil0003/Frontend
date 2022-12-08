import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  simpleAlert() {}
  title = 'todolist';
  User: any = '';
  constructor(private router: Router, private toastr: ToastrService) {}
  ngOnInit(): void {
    let user: any = JSON.parse(localStorage.getItem('user') as any);
    // this.User = user.name
  }

  loggedin() {
    return localStorage.getItem('user');
  }
  logout() {
    localStorage.clear();
    Swal.fire('User Logout');
    this.router.navigate(['/login']);
  }
}
