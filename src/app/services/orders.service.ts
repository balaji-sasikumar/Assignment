import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment.prod';


const orderUrl = environment.apiUrl+"/OrderProducts";


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
