import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Products ,Orders} from './Model';

const url = "https://uiexercise.onemindindia.com/api/Product";

const orderUrl = "https://uiexercise.onemindindia.com/api/OrderProducts";


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  listProducts: Products[] = [];//data

  constructor(
    private http: HttpClient
  ) { }


  getData(): Observable<Products[]> {
    return this.http.get<Products[]>(url).pipe(map( data => {
      this.listProducts = data;
      return data;
    }));
  }

  addProduct(data): Observable<any> {
    return this.http.post(url, data)
  }

  orderProduct(data): Observable<any>{
    return this.http.post(orderUrl,data)
  }

  getList(){
    return this.listProducts;
  }
}


