import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { ProductsService } from '../../services/products.service';
import { Orders, Products } from '../../models/Model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.css'],
})
export class OrderProductsComponent implements OnInit {
  id:string;
  orderProducts: Orders;
  listProducts:Products[];
  product:Products[];
  neededQuantity:number=1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ordersService: OrdersService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    // console.log(this.id);

    this.productsService.getData();
    this.productsService.productList.subscribe((response) => {
      this.listProducts = response;
      this.product = this.listProducts.filter(
        (product) => product.productId === this.id
      );
    });
    
  }
  onBack() {
    Swal.fire('Are you sure,Your entry will be deleted');
  }

  sliceInput(max,event) {
    // console.log(event)
    if(event.keyCode!=8){
      if (this.neededQuantity > max ) {
        Swal.fire(' ', 'Please give less than the available quantity', 'error');
        this.neededQuantity=1;
      }
      else if(this.neededQuantity<1){
        Swal.fire(' ', 'Please give the quantity greater than 1', 'error');
        this.neededQuantity=1;
      }
    }
  }

  onSubmit() {
    const product = {
      productId: this.product[0].productId,
      quantity: this.neededQuantity,
    };
    this.ordersService.orderProduct(product).subscribe(
      (result) => {
        Swal.fire({
          title: ' ',
          text: 'Order Placed',
          icon:'success',
        }).then((result)=>{
          if(result)
            location.reload()
        })
        this.neededQuantity=1
      },
      (error) => {
        // console.log(error);
        Swal.fire(' ', 'Order not placed', 'error');
      }
    );
    
  }
}
