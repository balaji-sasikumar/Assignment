import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../models/Model';
import { OrdersService } from '../../services/orders.service';
import {ProductsService} from '../../services/products.service';
import { NgForm } from '@angular/forms';
import { Orders } from '../../models/Model';
import swal from 'sweetalert2';
@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.css']
})
export class OrderProductsComponent implements OnInit {
  id ;
  orderProducts?: Orders;
  listProducts: Products[] = [];
  product;
  neededQuantity;


  constructor(private activatedRoute: ActivatedRoute,
    private ordersService: OrdersService,
    private productsService: ProductsService
    ) { }


  ngOnInit(): void {
    this.listProducts = this.productsService.getList();
    this.id = this.activatedRoute.snapshot.params.id;
    this.product=this.listProducts.filter(product=>product.productId===this.id)
   

  }

  onSubmit(formValue: NgForm) {
    
    
    const product = {    
      productId:this.product[0].productId,
      orderId: "ed8f5d51-3718-4b57-90eb-b9604d0a91e2",
      customerId: "bbd6b16e-e30b-467a-bc6a-b8aec876dff8",
      neededQuantity:this.neededQuantity
    }
    if (this.product[0].availableQuantity >= formValue.value.neededQuantity){
      this.ordersService.orderProduct(product)
      .subscribe(
        (result) => {
          this.orderProducts = product;
          swal.fire(" ","Order Placed",'success');
          formValue.reset();
        },
        (error) => {
          swal.fire(" ","Order not placed",'error');
        }
      )
    }
    else{
      swal.fire(" ","Please give less than the available quantity",'error')
    }
    

  }



}
