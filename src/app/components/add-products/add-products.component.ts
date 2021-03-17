import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent implements OnInit {
  isUpdate = false;
  id = '';
  listProducts;
  product;
  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {}
  formValue = {
    productName: '',
    availableQuantity: 1,
    price: 1,
  };
  sliceInput(data,max) {
    if (String(data).length > max) {
      data = Number(
        String(data).slice(0, max)
      );
      Swal.fire(' ', 'Please provide valid input', 'error');
      this.formValue = {
        productName: '',
        availableQuantity: 1,
        price: 1,
      };
    }
  }

  onSubmit(formValue) {
    if(this.formValue.productName!==''){
      if (!this.isUpdate) {
        this.productsService.addProduct(formValue).subscribe(
          (result) => {
            Swal.fire(' ', 'Product Added', 'success');
            // console.log(result);
            // location.reload()
          },
          (error) => {
            Swal.fire(' ', 'Please check the input field', 'error'); //exception use
          }
        );
      } else {
        this.productsService.updateProduct(this.id, formValue).subscribe(
          (result) => {
            Swal.fire(' ', 'Product Updated', 'success');
            // console.log(result);
            // location.reload()
          },
          (error) => {
            Swal.fire(' ', 'Please check the input field ', 'error'); //exception use
          }
        );
      }
    }
    else{
      Swal.fire("","Please provide data to the input field","error")
    }
    this.formValue = {
      productName: '',
      availableQuantity: 1,
      price: 1,
    };
  }

  onBack() {
    Swal.fire('Are you sure,Your entry will be deleted');
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    if (this.id) {
      this.isUpdate = true;
      // console.log(this.id);
      this.productsService.getData();
      this.productsService.productList.subscribe((productList) => {
        this.listProducts = productList;
        this.product = this.listProducts.filter(
          (product) => product.productId === this.id
        );
        this.formValue = {
          productName: this.product[0].productName,
          availableQuantity: this.product[0].availableQuantity,
          price: this.product[0].price,
        };
      });
    }
  }
}
