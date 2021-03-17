import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/models/Model';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {
  orderList:Orders[]
  format="MMM d,y hh:mm a"
  constructor(
    private ordersService:OrdersService
  ) { }
  getData() {
    this.ordersService.getData();
    this.ordersService.orderList.subscribe(
        response => {
          console.log(response);
          this.orderList = response;
        }
      )
  }

  ngOnInit(): void {
    this.getData();
  }

}
