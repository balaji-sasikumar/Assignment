import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Orders } from 'src/app/models/Model';
import { OrdersService } from '../../services/orders.service';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css'],
})
export class CartProductComponent implements OnInit, AfterViewInit {
  orderList;
  format = 'MMM d,y hh:mm a';
  displayedColumns: string[] = [
    'number',
    'productName',
    'quantity',
    'invoiceDate',
    'deliveredDate',
    'totalPrice',
    'action',
  ];
  // columnDefs = [
  //   { headerName:'Number',field: 'number' },
  //   { headerName:'Prdouct Name',field: 'product.productName' },
  //   { headerName:'Quantity',field: 'quantity' },
  //   { headerName:'Invoice Date',field: 'invoiceDate' },
  //   { headerName:'Delivered Date',field: 'deliveredDate' },
  //   { headerName:'Total Price',field: 'quantity * product.price ' },
  //   { headerName:'Action',field: 'action' },
  // ];
  constructor(private ordersService: OrdersService) {
    this.ordersService.getData();
    this.ordersService.orderList.subscribe((response: Orders[]) => {
      // console.log(response);
      this.orderList = new MatTableDataSource(response);
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.ngAfterViewInit();
  }
  ngAfterViewInit() {
    this.orderList.sort = this.sort;
  }
  deleteData(id) {
    this.ordersService.deleteProduct(id).subscribe(
      (response) => {
        console.log(response);
        console.log(id);
        Swal.fire(' ', 'Order Deleted', 'success');
        setTimeout(() => {
          location.reload();
        }, 3000);
      },
      (error) => {
        console.log(error);
        Swal.fire(' ', 'Order cannot be deleted', 'error');
      }
    );
  }
}
