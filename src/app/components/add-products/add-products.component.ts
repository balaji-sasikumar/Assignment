import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../models/Model';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent implements OnInit {
  isUpdate: boolean = false;
  id: string = '';
  listProducts: Products[];
  product: Products[];
  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {}
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
  formValue = {
    productName: '',
    availableQuantity: 1,
    price: 100,
  };
  sliceInput(data: number, max: number) {
    if (String(data).length > max) {
      data = Number(String(data).slice(0, max));
      Swal.fire(' ', 'Please provide valid input', 'error');
      this.formValue = {
        productName: '',
        availableQuantity: 1,
        price: 100,
      };
    }
  }
  // /^[a-z\d ]+$/i
  validate(event) {
    console.log(event);
    return (
      (event.charCode >= 49 && event.charCode <= 122) || event.charCode == 32 || event.charCode!=64
    );
  }
  onSubmit(formValue) {
    if (
      formValue.productName.trim() !== '' &&
      formValue.productName.length >= 4
    ) {
      if (!this.isUpdate) {
        this.productsService.addProduct(formValue).subscribe(
          (result) => {
            Swal.fire({
              title: ' ',
              text: 'Product Added',
              icon: 'success',
            });
          },
          (error) => {
            Swal.fire(' ', 'Please check the input field', 'error'); //exception use
          }
        );
      } else {
        this.productsService.updateProduct(this.id, formValue).subscribe(
          (result) => {
            Swal.fire({
              title: ' ',
              text: 'Product Updated',
              icon: 'success',
            });
          },
          (error) => {
            Swal.fire(' ', 'Please check the input field ', 'error'); //exception use
          }
        );
      }
    } else {
      Swal.fire('', 'Please provide valid data to Product Name field', 'error');
    }
    this.formValue = {
      productName: '',
      availableQuantity: 1,
      price: 100,
    };
  }

  onBack() {
    Swal.fire('Are you sure,Your entry will be deleted');
  }

  
}
