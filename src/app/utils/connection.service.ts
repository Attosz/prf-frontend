import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private backendRoot = environment.backend;

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
    return this.http.get(this.backendRoot+'/users', { withCredentials: true });
  }

  getUser(username: string) {
    return this.http.get(this.backendRoot+'/users/'+username, { withCredentials: true });
  }

  getUsers() {
    return this.http.get(this.backendRoot+'/allusers', { withCredentials: true });
  }

  postUser(username: string, password: string ,email: string) {
    const userInfo = {
      password: password, email: email
    }
    return this.http.post(this.backendRoot+'/users/'+username, userInfo, { withCredentials: true });
  }

  putWalletUser(username: string, wallet: number) {
    const userInfo = {
      wallet: wallet
    }
    return this.http.put(this.backendRoot+'/users/'+username, userInfo, { withCredentials: true });
  }

  deleteUser(username: string) {   
    return this.http.delete(this.backendRoot+'/users/'+username, { withCredentials: true });
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
