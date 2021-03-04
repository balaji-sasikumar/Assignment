import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { OrderProductsComponent } from './components/order-products/order-products.component';
import {PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'',redirectTo:'list-products',pathMatch:'full'},
  {path:'list-products',component:ListProductsComponent},
  {path:'add-product',component:AddProductsComponent},
  {path:'order-products/:id',component:OrderProductsComponent},
  {path:'**',component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
