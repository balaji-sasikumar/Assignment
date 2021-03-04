import { Component, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import {Products} from '../../models/Model';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  listProducts?: Products[];


  constructor(
    private productsService:ProductsService,
  ) { }

  getData() {
    this.productsService.getData()
      .subscribe(
        response => {
          // console.log(response);
          this.listProducts = response;
        }
      )
  }

  ngOnInit(): void {
    this.getData();
  }

}
