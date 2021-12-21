import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../models/cart';
import { LocalstorageService } from '../services/localstorage.service';
import { ProductApiService } from '../services/product-api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private _sessionStorage: LocalstorageService, private _productService: ProductApiService, private router: Router, private route: ActivatedRoute) { }

  userId!:string;

  items!:any;

  quantity:String = '1';
  size:String = '6';
  itemCount!:Number;
  grossAmount!:Number;


  getUserId(){
    let data = this._sessionStorage.getFromStorage('user');
    console.log(data);
    this.userId = data === '' ? 'Sign In' : data.phone;
  }

  removeFromCart(id:any) {
    this._productService.removeFromCart(id).subscribe(data =>{
      console.log(data);
    })
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  updateQuantity(id:any, quantity:string){
    this._productService.updateQuantity(id, quantity).subscribe(data => {
      console.log(data);
    })
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  updateSize(id:any, size:string){
    this._productService.updateSize(id, size).subscribe(data => {
      console.log(data);
    })
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  checkout() {
    this.router.navigate(['../checkout'], {relativeTo: this.route});
  }


  ngOnInit(): void {
    this.getUserId();
    console.log(this.userId);
    this._productService.fetchProductForCart(this.userId).subscribe((data) => {
    this.items = data;
    let grossprice:number = 0;
    let itemcount:number = 0
      for(let i=0; i<this.items.length; i++){
        itemcount += parseInt(this.items[i].quantity);
        console.log(itemcount);
        grossprice += (parseInt(this.items[i].quantity) * parseInt(this.items[i].productprice.split(',').join('')));
      }
      console.log(itemcount);
      console.log(grossprice);
      console.log(data);
      this.itemCount = itemcount;
      this.grossAmount = grossprice;
    })
  }

}
