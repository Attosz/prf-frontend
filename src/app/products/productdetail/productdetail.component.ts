import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { ConnectionService } from 'app/utils/connection.service';
import { Product } from '../Product';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private connection: ConnectionService,
    private userService: UserService
  ) {
    this.product = undefined
    this.itemcount = 0;
    this.price = 0;
    this.msg = "";
    this.toggle = false;
    this.orderViewToggle = false;
  }

  ngOnInit(): void {
    this.getProduct();
  }

  isAdmin(): boolean {
    return this.userService.isAdmin();
  }

  toggleAdd(): void {
    this.toggle = !this.toggle
    if (this.product) {
      this.itemcount = this.product?.getItemCount();
      this.price = this.product?.getPrice();
    }
  }

  toggleOrderView(): void {
    this.orderViewToggle = !this.orderViewToggle
    if (this.product) {
      this.itemcount = this.product?.getItemCount();
    }
  }

  submitUpdate(): void {
    if (this.product != undefined) {
      this.connection.putProduct(this.product?.getName(), this.price, this.itemcount).subscribe({
        next: (v) => { },
        error: (e) => { if(e) this.msg = e.error },
        complete: () => {
          this.getProduct();
          this.msg = "Succesfully updated: " + this.product?.getName();
        }
      })
    } else {
      this.msg = "This isn't supposed to happen: No product found!"
    }
  }

  submitDelete(): void {
    if (this.product != undefined) {
      this.connection.deleteProduct(this.product?.getName()).subscribe({
        next: (v) => { },
        error: (e) => { if(e) {this.msg = e.error.text; console.log(e.error.text)} },
        complete: () => {
          this.msg = "Succesfully deleted:"
        }
      })
    } else {
      this.msg = "This isn't supposed to happen: Product already not found!"
    }
  }

  submitOrder(): void {
    if (this.product != undefined) {
      this.connection.postOrder(this.product?.getName(), this.itemcount).subscribe({
        next: (v) => { },
        error: (e) => { if(e) this.msg = e.error },
        complete: () => {
          this.getProduct();
          this.msg = "Succesfully Ordered: " + this.product?.getName();
        }
      })
    } else {
      this.msg = "This isn't supposed to happen: No product found!"
    }
  }

  private getProduct() {
    this.route.params.subscribe((params: any) => {
      if (params['id'] != '') {
        this.connection.getProduct(params['id']).subscribe({
          next: (product: any) => {
            this.product = new Product(product._id, product.name, product.price, product.itemcount)
          },
          error: (e) => console.error(e.error),
          complete: () => console.info('complete')
        });
      }
    });
  }

  price: number;
  itemcount: number;
  msg: string;
  toggle: boolean
  orderViewToggle: boolean
  product?: Product;

}
