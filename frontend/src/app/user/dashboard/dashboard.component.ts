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
    this.getArray();
  }


  getArray() {
    this.taskArr = JSON.parse(localStorage.getItem('todoArray') as any);
  }

  getalltask() {
    this.authservice.gettask().subscribe((response: any) => {
      this.taskArr = response.data.result[0].todoArray;
    });
  }

  addTask(data: any) {
    this.authservice.addtask(data, this.userId).subscribe((response: any) => {
      if (response.status) {
        this.toastr.success('Task Added Successfully');

        localStorage.setItem(
          'todoArray',
          JSON.stringify(response.data.result.todoArray)
        );
        this.addTaskValue = '';
        this.getArray();
      }
    });
  }

  updateTAsk(todo: any) {
    this.authservice
      .updateTask(this.userId, this.taskIdToBeEdit, todo)
      .subscribe((res: any) => {
        if (res) {
          this.toastr.success('Task Updated');
          localStorage.setItem(
            'todoArray',
            JSON.stringify(res.data.result.todoArray)
          );
          this.getArray();
          this.closePopup();
        }
      });
  }

  deleteTask(todoId: any) {
    this.authservice
      .deletetask(this.userId, todoId)
      .subscribe((response: any) => {
        localStorage.setItem(
          'todoArray',
          JSON.stringify(response.data.result.todoArray)
        );
        this.getArray();
        this.toastr.error('Task Deleted');
      });
  }

  displayStyle = 'none';

  openPopup(todo: any) {
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
