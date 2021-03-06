import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ProductsService } from '../products.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  constructor(
    private productsService:ProductsService
  ) {
   }

  onSubmit(f:NgForm){
    this.productsService.addProduct(f.value)
      .subscribe(
        (result)=>{
          swal.fire(" ","Product Added",'success');
          console.log(result)
          f.reset()
        },
        (error)=>{
          swal.fire(" ","Please check the input field",'error')

        }
      )

  }

  ngOnInit(): void {
  }

}
