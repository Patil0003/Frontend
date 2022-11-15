import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/services/auth-services.service';
import { Task } from '../../model/task';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
 
  taskObj: Task = new Task();
  isloggedin: any;
  taskArr: Task[] = [];
  taskToBeEdit: any = { todo: '' };
  taskIdToBeEdit: any;
  userId: any;
  todotask: any = [];
  addTaskValue: string = '';
  editTaskValue: string = '';
  constructor(
    private authservice: AuthServicesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isloggedin = JSON.parse(localStorage.getItem('user') as any);
    this.userId = this.isloggedin._id;
    this.taskArr = JSON.parse(localStorage.getItem('todoArray') as any);
  }
  getalltask() {
    this.authservice.gettask().subscribe((response: any) => {
      this.taskArr = response.result;
    });
  }

  addTask(data: any) {
    // console.log('Data okay', data);
    this.authservice.addtask(data, this.userId).subscribe((response: any) => {
      // console.log('Updated Response', response);
      if (response.status) {
        this.toastr.success('Task Added Successfully');
        this.taskArr = response.result;
        localStorage.setItem('todoArray', JSON.stringify(response.result));
        this.addTaskValue = '';
      }
    });
  }

  editTask(todo: any) {
    this.authservice
      .updateTask(this.userId, this.taskIdToBeEdit, todo)
      .subscribe((res: any) => {
        // console.log('ress', res);
        if (res) {
          this.toastr.success('Task Updated');
          localStorage.setItem('todoArray', JSON.stringify(res.result));
          this.closePopup();
          this.ngOnInit();
        }
      });
  }

  deleteTask(todoId: any) {
    this.authservice
      .deletetask(this.userId, todoId)
      .subscribe((response: any) => {
        localStorage.setItem('todoArray', JSON.stringify(response.result));
        this.ngOnInit();
        this.toastr.error('Task Deleted');
      });
  }

  displayStyle = 'none';

  openPopup(todo: any) {
    // console.log('Task Edit', todo);
    this.taskToBeEdit.todo = todo.todo;
    this.taskIdToBeEdit = todo._id;
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
  }
  call(etask: Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.todo;
  }
}
