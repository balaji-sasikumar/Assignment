import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Products } from '../../models/Model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'number',
    'productName',
    'availableQuantity',
    'price',
    'action',
  ];

  listProducts;

  constructor(private productsService: ProductsService) {
    this.productsService.getData();
    this.productsService.productList.subscribe((response: Products[]) => {
      this.listProducts = new MatTableDataSource(response);
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    this.listProducts.sort = this.sort;
  }

  deleteData(id) {
    this.productsService.deleteProduct(id).subscribe(
      (response) => {
        Swal.fire({
          title: ' ',
          text: 'Product Deleted',
          icon: 'success',
        }).then((result) => {
          if (result) location.reload();
        });
      },
      (error) => {
        Swal.fire(' ', 'Product cannot be deleted', 'error');
      }
    );
  }
}
