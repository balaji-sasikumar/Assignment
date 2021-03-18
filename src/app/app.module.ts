import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { OrderProductsComponent } from './components/order-products/order-products.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductsService } from './services/products.service';
import { OrdersService } from './services/orders.service';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { Material } from 'src/assets/packages/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AddProductsComponent,
    ListProductsComponent,
    OrderProductsComponent,
    PageNotFoundComponent,
    CartProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    Material,
    BrowserAnimationsModule,
  ],
  providers: [ProductsService, OrdersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
