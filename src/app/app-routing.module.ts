import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { UserGuard } from './guards/user.guard';
import { LoginComponent } from './login/login.component';
import { OrderdetailsComponent } from './orders/orderdetails/orderdetails.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductdetailComponent } from './products/productdetail/productdetail.component';
import { ProductsComponent } from './products/products.component';
import { UserdetailsComponent } from './users/userdetails/userdetails.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  
  // PRODUCTS
  { path: 'products/:id', canActivate: [UserGuard], component: ProductdetailComponent },
  { path: 'products', canActivate: [UserGuard], component: ProductsComponent },
  
  // ORDERS
  { path: 'orders/:id', canActivate: [UserGuard], component: OrderdetailsComponent },
  { path: 'orders', canActivate: [UserGuard], component: OrdersComponent },

  // USERS
  { path: 'user/:id', canActivate: [UserGuard], component: UserdetailsComponent },
  { path: 'user', canActivate: [UserGuard], component: UserdetailsComponent },
  
  // Other
  { path: '', redirectTo: 'orders', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
