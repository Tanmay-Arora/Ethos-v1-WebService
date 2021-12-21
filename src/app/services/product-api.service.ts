import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { map, Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { specification } from '../models/specification.model';
import { Address } from '../models/address';


@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8002/listing'

  cartAddUrl = 'http://localhost:8003/cart/addtocart'
  cartFetchUrl = 'http://localhost:8003/cart/fetchfromcart'
  cartDeleteURL = 'http://localhost:8003/cart/removeItem'
  cartUpdateQuantity = 'http://localhost:8003/cart/updateQuantity'
  cartUpdateSize = 'http://localhost:8003/cart/updateSize'
  userUrl = 'http://localhost:8004/user'

  getProducts(): Observable<Product> {
    return this.http.get<Product>(`${this.url}/latestproducts`).pipe(map((res:any) => {
      return res;
    }));
  }

  getProduct(id: any): Observable<Product> {
    return this.http.get<Product>(`${this.url}/product/${id}`).pipe(map((res:any) => {
      return res;
    }));
  }

  getFilteredProducts(type: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}/filterproducts/${type}`).pipe(map((res:any) => {
      return res;
    }))
  }

  addProductToCart(cart: Cart): Observable<Cart>{
    return this.http.post<Cart>(this.cartAddUrl, cart);
  }

  fetchProductForCart(id: any): Observable<Cart>{
    return this.http.get<Cart>(`${this.cartFetchUrl}/${id}`).pipe(map((res:any) => {
      return res;
    }))
  }

  getSpecs(id:any): Observable<specification> {
    return this.http.get<specification>(`${this.url}/specs/${id}`).pipe(map((res:any) => {
      return res;
    }))
  }

  removeFromCart(id:any): Observable<Cart> {
    return this.http.delete<Cart>(`${this.cartDeleteURL}/${id}`).pipe(map((res:any) => {
      return res;
    }))
  }

  updateQuantity(id:any, quantity: string): Observable<Cart> {
    return this.http.put<Cart>(`${this.cartUpdateQuantity}/${id}`, {quantity});
  }

  updateSize(id:any, size: string): Observable<Cart> {
    return this.http.put<Cart>(`${this.cartUpdateSize}/${id}`, {size});
  }

  addAddress(addressObj: Address): Observable<Address> {
    return this.http.post<Address>(`${this.userUrl}/addAddress`, addressObj);
  }

  fetchAddress(id: any): Observable<Address> {
    return this.http.get<Address>(`${this.userUrl}/getAddress/${id}`).pipe(map((res:any) => {
      return res;
    }));
  }

  fetchAllAddress(): Observable<Address> {
    return this.http.get<Address>(`${this.userUrl}/getAllAddress`).pipe(map((res:any) => {
      return res;
    }));
  }

  placeOrder(amount: string){
    return this.http.post(`http://localhost:8003/cart/order`, {amount});
  }

  createOrder( response: any){
    return this.http.post(`http://localhost:8003/cart/createorder`, response);
  }

}
