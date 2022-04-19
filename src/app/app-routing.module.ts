import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { UserGuard } from './guards/user.guard';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  
  // PRODUCTS
  { path: 'products', redirectTo: 'products/', pathMatch: 'full'},
  { path: 'products/:id?', canActivate: [UserGuard], component: ProductsComponent },

  // ORDERS
  { path: 'orders', redirectTo: 'orders/', pathMatch: 'full'},
  { path: 'orders/:id?', canActivate: [UserGuard], component: OrdersComponent },

  // USERS
  { path: 'users', redirectTo: 'users/', pathMatch: 'full'},
  { path: 'users/:id?', canActivate: [UserGuard], component: UsersComponent },

  // Other
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
