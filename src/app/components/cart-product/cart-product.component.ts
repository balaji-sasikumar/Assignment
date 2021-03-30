import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Orders } from 'src/app/models/Model';
import { OrdersService } from '../../services/orders.service';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css'],
})
export class CartProductComponent implements OnInit, AfterViewInit {
  orderList;
  // term
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
  constructor(private ordersService: OrdersService) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.ngAfterViewInit();
  }
  ngAfterViewInit() {
    this.ordersService.getData();
    this.ordersService.orderList.subscribe((response: Orders[]) => {
      // console.log(response);
      this.orderList = new MatTableDataSource(response);
      this.orderList.sort = this.sort;
      this.orderList.paginator = this.paginator;
      this.orderList.filterPredicate = (data: any, filter: string) =>{
        console.log(data)
        return data.product.productName.indexOf(filter) != -1;

      }
    });
  }
  deleteData(id) {
    this.ordersService.deleteProduct(id).subscribe(
      (response) => {
        Swal.fire({
          title: ' ',
          text: 'Order Deleted',
          icon: 'success',
        }).then((result) => {
          if (result) location.reload();
        });
      },
      (error) => {
        console.log(error);
        Swal.fire(' ', 'Order cannot be deleted', 'error');
      }
    );
  }
  applyFilter(filterValue) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.orderList.filter = filterValue;
  }
}
