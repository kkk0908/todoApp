import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  protected apiUrl = '';

  constructor(
    private http: HttpClient
  ) {
    this.apiUrl = ENVIRONMENT.API_ENDPOINT;
  }

  createTask(data: any) {
    return this.http.post(`${this.apiUrl}/task/createTask`, data);
  }

  editTask(data: any) {
    return this.http.put(`${this.apiUrl}/task/editTask`, data);
  }

  getAllTask() {
    return this.http.get(`${this.apiUrl}/task/getAllTask`);
  }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  registration(data: any) {
    return this.http.post(`${this.apiUrl}/signUp`, data);
  }

  logout() {
    return this.http.get(`${this.apiUrl}/logout`);
  }

}
