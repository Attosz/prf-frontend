import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prf-frontend';
  
  readonly navPages = new Map<string, string> ([
    ["login", "Login"],
    ["products", "Products"],
    ["orders", "Orders"],
    ["users", "User Info"],
  ])

  constructor(
    private modalService: NgbModal
  ) {}

  public open(modal: any): void {
    this.modalService.open(modal);
  }

}
