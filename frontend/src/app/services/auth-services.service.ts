import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model/task';
@Injectable({
  providedIn: 'root',
})
export class AuthServicesService {
  private apiURL = 'http://localhost:9999';

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
    // console.log("login",data)
    return this.httpClient.post(`${this.apiURL}/gateway/signup`, data);
  }
  fileupload(formData: any) {
    console.log('Console image:-', formData);
    return this.httpClient.post(`${this.apiURL}/gateway/upload`, formData);
  }
  // fileupload(formData: any) {
  //   console.log('login', formData);
  //   return this.httpClient.post(
  //     `${this.api_Image_URL}/user/imageupload`,
  //     formData
  //   );
  // }
  login(data: any) {
    return this.httpClient.post(`${this.apiURL}/gateway/login`, data);
  }

  addtask(todo: any, _id: any) {
    // console.log("Task",todo,_id)
    return this.httpClient.post<any>(`${this.apiURL}/gateway/add-task`, {
      todo,
      _id,
    });
  }
  gettask(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.apiURL}/gateway/show-list`);
  }

  updateTask(_id: any, todoId: any, data: any) {
    let userData = { ...data, _id, todoId };
    // console.log('userData update servise', userData);
    return this.httpClient.put<any>(
      `${this.apiURL}/gateway/update-task`,
      userData
    );
  }

  deletetask(_id: any, todoId: any) {
    return this.httpClient.put<Task>(`${this.apiURL}/gateway/delete-task`, {
      _id,
      todoId,
    });
  }

  getImage(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.apiURL}/gateway/show-image`);
  }
 
}
