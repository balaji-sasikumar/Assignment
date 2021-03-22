import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Products } from '../../models/Model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
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

  constructor(private productsService: ProductsService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    this.productsService.getData();
    this.productsService.productList.subscribe((response: Products[]) => {
      this.listProducts = new MatTableDataSource(response);
      this.listProducts.sort = this.sort;
      this.listProducts.paginator = this.paginator;
      this.listProducts.filterPredicate = (data: any, filter: string) =>
        data.productName.indexOf(filter) != -1;
    });
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
  applyFilter(filterValue) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.listProducts.filter = filterValue;
  }
}
