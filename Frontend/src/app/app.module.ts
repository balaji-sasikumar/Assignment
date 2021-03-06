import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { OrderProductsComponent } from './order-products/order-products.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsService } from './products.service';

@NgModule({
  declarations: [
    AppComponent,
    AddProductsComponent,
    ListProductsComponent,
    OrderProductsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      
      {path:'',redirectTo:'list-products',pathMatch:'full'},
      {path:'list-products',component:ListProductsComponent},
      {path:'add-product',component:AddProductsComponent},
      {path:'order-products/:id',component:OrderProductsComponent},
      {path:'**',component:PageNotFoundComponent},
      
    ])
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
