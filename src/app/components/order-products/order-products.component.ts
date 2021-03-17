import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { ProductsService } from '../../services/products.service';
import { Orders } from '../../models/Model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.css'],
})
export class OrderProductsComponent implements OnInit {
  id;
  orderProducts?: Orders;
  listProducts;
  product;
  neededQuantity;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ordersService: OrdersService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    console.log(this.id);

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

  sliceInput(max) {
    if (this.neededQuantity > max) {
      Swal.fire(' ', 'Please give less than the available quantity', 'error');
    }
  }

  onSubmit() {
    const product = {
      productId: this.product[0].productId,
      orderId: 'ed8f5d51-3718-4b57-90eb-b9604d0a91e2',
      customerId: 'bbd6b16e-e30b-467a-bc6a-b8aec876dff8',
      quantity: this.neededQuantity,
    };
    this.ordersService.orderProduct(product).subscribe(
      (result) => {
        Swal.fire(' ', 'Order Placed', 'success');
        this.neededQuantity=1
      },
      (error) => {
        console.log(error);
        Swal.fire(' ', 'Order not placed', 'error');
      }
    );
    setTimeout(() => {
      location.reload();
    }, 5000);
  }
}
