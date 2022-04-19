import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private backendRoot = 'http://localhost:3000'

  constructor(
    private http: HttpClient
  ) {}

  postLogin(username: string, password: string) {
    const userInfo = {
      username: username, password: password
    }
    return this.http.post(this.backendRoot+'/login', userInfo, {responseType: "text"});
  }

  getProducts() {
    return this.http.get(this.backendRoot+'/products', {withCredentials: true});
  }
}
