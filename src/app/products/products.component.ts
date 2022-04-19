import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectionService } from 'app/utils/connection.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private connection: ConnectionService
  ) { }

  ngOnInit(): void {
    this.connection.getProducts().subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e.error),
      complete: () => console.info('complete')
    });
  }

}
