import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Orders } from '../models/Model';
import {environment} from 'src/environments/environment.prod';


const orderUrl = environment.apiUrl+"/OrderProducts";


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  orderList = new Subject<Orders[]>();

  constructor(
    private http: HttpClient

  ) { }
  
  getData() {
    this.http.get<Orders[]>(orderUrl).subscribe(orderList => this.orderList.next(orderList));
  }
  orderProduct(data): Observable<any>{
    return this.http.post(orderUrl,data)
  }
}
