import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const orderUrl = "https://uiexercise.onemindindia.com/api/OrderProducts";


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient

  ) { }

  orderProduct(data): Observable<any>{
    return this.http.post(orderUrl,data)
  }
}
