import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private backendRoot = "http://localhost:3000"

  constructor(
    private http: HttpClient
  ) {
    //this.backendRoot = environment.backend;
  }

  postLogin(username: string, password: string) {
    const userInfo = {
      username: username, password: password
    }
    return this.http.post(this.backendRoot+'/login', userInfo, {responseType: "text", withCredentials: true});
  }

  postLogout() {
    return this.http.post(this.backendRoot+'/logout', { responseType: "text", withCredentials: true });
  }

  //PRODUCTS

  getProducts() {
    return this.http.get(this.backendRoot+'/products', { withCredentials: true });
  }

  getProduct(productName: string) {
    return this.http.get(this.backendRoot+'/products/'+productName, { withCredentials: true });
  }

  postProduct(name: string, price: number, itemcount: number) {
    const productInfo = {
      price: price, itemcount: itemcount
    }
    return this.http.post(this.backendRoot+'/products/'+name, productInfo, { withCredentials: true });
  }

  putProduct(name: string, price: number, itemcount: number) {
    const productInfo = {
      price: price, itemcount: itemcount
    }
    return this.http.put(this.backendRoot+'/products/'+name, productInfo, { withCredentials: true });
  }

  deleteProduct(name: string) {
    return this.http.delete(this.backendRoot+'/products/'+name, { withCredentials: true });
  }

  //USERS

  getOwnUser() {
    return this.http.get(this.backendRoot+'/users/', { withCredentials: true });
  }

  //ORDERS

  getOrders() {
    return this.http.get(this.backendRoot+'/orders', { withCredentials: true });
  }

  getOrder(id: string) {
    return this.http.get(this.backendRoot+'/orders/'+id, { withCredentials: true });
  }

  postOrder(productname: string, itemcount: number) {
    const orderInfo = {
      productname: productname, itemcount: itemcount
    }
    return this.http.post(this.backendRoot+'/orders/', orderInfo, { withCredentials: true });
  }

  putOrder(id: string, status: string) {
    const orderInfo = {
      status: status
    }
    return this.http.put(this.backendRoot+'/orders/'+id, orderInfo, { withCredentials: true });
  }

  deleteOrder(id: string) {
    return this.http.delete(this.backendRoot+'/orders/'+id, { withCredentials: true });
  }
}
