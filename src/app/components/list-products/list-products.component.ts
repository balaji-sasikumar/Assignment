import { Component, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import {Products} from '../../models/Model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  listProducts: Products[];


  constructor(
    private productsService:ProductsService,
  ) { }

  getData() {
    this.productsService.getData();
    this.productsService.productList.subscribe(
        response => {
          // console.log(response);
          this.listProducts = response;
        }
      )
  }
  deleteData(id){
    this.productsService.deleteProduct(id)
    .subscribe(
      response=>{
        Swal.fire(" ", "Product Deleted", 'success');
        this.ngOnInit()
      },
      error=>{
        Swal.fire(" ", "Product cannot be deleted", 'error');
      }
    )
  }

  ngOnInit(): void {
    this.getData();
  }

}
