import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/models/Model';
import { OrdersService } from '../../services/orders.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css'],
})
export class CartProductComponent implements OnInit {
  orderList: Orders[];
  format = 'MMM d,y hh:mm a';
  constructor(private ordersService: OrdersService) {}
  getData() {
    this.ordersService.getData();
    this.ordersService.orderList.subscribe((response) => {
      // console.log(response);
      this.orderList = response;
    });
  }
  deleteData(id) {
    this.ordersService.deleteProduct(id).subscribe(
      (response) => {
        Swal.fire(' ', 'Order Deleted', 'success');
        this.ngOnInit();
      },
      (error) => {
        Swal.fire(' ', 'Order cannot be deleted', 'error');
      }
    );
  }

  ngOnInit(): void {
    this.getData();
  }
}
