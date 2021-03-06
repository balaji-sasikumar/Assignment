import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../Model';
import { ProductsService } from '../products.service';
import { NgForm } from '@angular/forms';
import { Orders } from '../Model';
import swal from 'sweetalert2';
@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.css']
})
export class OrderProductsComponent implements OnInit {
  index = 0;
  orderProducts?: Orders;
  listProducts: Products[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private productsService: ProductsService) { }


  ngOnInit(): void {
    this.listProducts = this.productsService.getList();
    this.index = this.activatedRoute.snapshot.params.id;
    console.log(this.activatedRoute.snapshot.params.id);

  }

  onSubmit(f: NgForm) {
    
    
    const product = {    
      productId:this.listProducts[this.index].productId,
      orderId: "ed8f5d51-3718-4b57-90eb-b9604d0a91e2",
      customerId: "bbd6b16e-e30b-467a-bc6a-b8aec876dff8",
      ...f.value
    }
    if (this.listProducts[this.index].availableQuantity >= f.value.neededQuantity){
      this.productsService.orderProduct(product)
      .subscribe(
        (result) => {
          // console.log(product)
          this.orderProducts = product;
          console.log(this.orderProducts)
          swal.fire(" ","Order Placed",'success');
          f.reset()
          console.log(result)
        },
        (error) => {
          swal.fire(" ","Order not placed",'error')
        }
      )
    }
    else{
      swal.fire(" ","Please give less than the available quantity",'error')
    }
    

  }



}

// "bbd6b16e-e30b-467a-bc6a-b8aec876dff8"