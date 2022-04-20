import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { ConnectionService } from 'app/utils/connection.service';
import { Product } from './Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private connection: ConnectionService,
    private userService: UserService
  ) {
    this.productName = ""
    this.itemcount = 0;
    this.price = 0;
    this.msg = "";
    this.toggle = false;
    this.productList = []
  }

  ngOnInit(): void {
    this.getProducts();
  }

  isAdmin(): boolean {
    return this.userService.isAdmin();
  }

  toggleAdd(): void {
    this.toggle = !this.toggle
  }

  submitAdd(): void {
    this.connection.postProduct(this.productName, this.price, this.itemcount).subscribe({
      next: (v) => { },
      error: (e) => { if(e) this.msg = e.error },
      complete: () => {
        this.getProducts();
        this.msg = "Succesfully added: " + this.productName
      }
    })
  }

  private getProducts() {
    this.productList = [];
    this.connection.getProducts().subscribe({
      next: (products) => {
        this.fillProductArray(products)
      },
      error: (e) => console.error(e.error),
      complete: () => console.info('complete')
    });
  }

  private fillProductArray(products: any): void {
    for (const product of products) {
      this.productList.push(
        new Product(product._id, product.name, product.price, product.itemcount));
    }
  }

  productName: string;
  price: number;
  itemcount: number;
  msg: string;
  toggle: boolean
  productList: Array<Product>;

}
