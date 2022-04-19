import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private backendRoot = 'localhost:3000'

  constructor(
    private http: HttpClient
  ) {}

  getHttpReq() {
    return this.http.get(this.backendRoot+'/arukereso');
  }

}
