import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';
import { ProductApiService } from '../services/product-api.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {

  constructor(private _sessionStorage: LocalstorageService, private _productService: ProductApiService, private router: Router, private route: ActivatedRoute) { }

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

  redirToOrders() {
    this.router.navigate(['../users/orders'], {relativeTo: this.route})
  }

}
