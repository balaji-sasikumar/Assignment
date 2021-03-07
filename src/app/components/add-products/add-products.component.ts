import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  availableQuantity;
  constructor(
    private productsService:ProductsService
  ) {
   }

   sliceInput(max) {
    if (String(this.availableQuantity).length > max){
      this.availableQuantity = String(this.availableQuantity).slice(0, max);
      swal.fire(" ", "Please provide valid input", 'error');
    }
    
  }

  onSubmit(formValue:NgForm){
    this.productsService.addProduct(formValue.value)
      .subscribe(
        (result)=>{
          swal.fire(" ","Product Added",'success');
          console.log(result)
          formValue.reset()
        },
        (error)=>{
          swal.fire(" ","Please check the input field",'error')//exception use

        }
      )

  }

  onBack(){
    swal.fire("Are you sure,Your entry will be deleted");
    
  }

  ngOnInit(): void {
  }

}
