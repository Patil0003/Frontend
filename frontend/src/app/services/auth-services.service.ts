import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model/task';
@Injectable({
  providedIn: 'root',
})
export class AuthServicesService {
  private apiURL = 'http://localhost:3216';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'authoriztion',
    }),
  };
  constructor(
    private httpClient: HttpClient // private router: Router,
  ) {}
  loggedin() {
    return !!localStorage.getItem('user');
  }
  signup(data: any) {
    return this.httpClient.post(`${this.apiURL}/user/signup`, data);
  }
  login(data: any) {
    return this.httpClient.post(`${this.apiURL}/user/login`, data);
  }
  checkmail(data: any) {
    return this.httpClient.post(`${this.apiURL}/user/forgetpassword`, data);
  }
  resetPassword(data: any) {
    return this.httpClient.post(`${this.apiURL}/user/resetpassword`, data);
  }
  addtask(todo: any,_id:any){
    // console.log("Task",todo)
    return this.httpClient.post<any>(`${this.apiURL}/user/addtask`, { todo ,_id});
  }
  gettask(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.apiURL}/user/list`);
  }
  
  updateTask(_id: any, todoId:any,data: any) {
    let userData = { ...data, _id,todoId };
    console.log("userData update servise", userData)
    return this.httpClient.post<any>(`${this.apiURL}/user/update`
      , userData);
  }
  deletetask(_id:any,todoId:any){
    return this.httpClient.put<Task>(`${this.apiURL}/user/deletetask`, {_id,todoId});
  }
}
