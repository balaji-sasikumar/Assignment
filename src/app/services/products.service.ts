import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Products } from '../models/Model';
import { environment } from 'src/environments/environment.prod';

const url = environment.apiUrl + "/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productList = new Subject<Products[]>();

  constructor(
    private http: HttpClient
  ) { }


  getData() {
    this.http.get<Products[]>(url).subscribe(productList => this.productList.next(productList));
  }

  addProduct(data): Observable<any> {
    return this.http.post(url, data)
  }

  deleteProduct(id): Observable<any> {
    var endpoint = url + "/" + id
    console.log(endpoint)
    return this.http.delete(endpoint)
  }

  updateProduct(id, data): Observable<any> {
    var endpoint = url + "/" + id
    console.log(endpoint)
    return this.http.put(endpoint, data)
  }
}


