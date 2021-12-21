import { Component, OnInit } from '@angular/core';
import { SelectControlValueAccessor } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { LocalstorageService } from '../services/localstorage.service';
import { ProductApiService } from '../services/product-api.service';

declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private _sessionStorage: LocalstorageService, private _productService: ProductApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUserId();
    console.log(this.userId);
    this._productService.fetchProductForCart(this.userId).subscribe((data) => {
    this.items = data;
    let grossprice:number = 0;
    let itemcount:number = 0;
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

    this._productService.fetchAddress(this.userId).subscribe(data => {
      console.log(data);
      this.addresses = data;
      
    })
  }


  userId!:string;
  items!:any;
  quantity:String = '1';
  size:String = '6';
  itemCount!:number;
  grossAmount!:number;
  addresses!:any;
  orderObj!:any;

  getUserId(){
    let data = this._sessionStorage.getFromStorage('user');
    console.log(data);
    this.userId = data === '' ? 'Sign In' : data.phone;
  }

  placeOrder() {
    if(this.grossAmount > 0){
      this._productService.placeOrder(`${this.grossAmount}`).subscribe((info) => {
        this.orderObj = info;
        console.log(this.orderObj);
        var options = {
          "key": "rzp_test_vyJglBXedDjebz", // Enter the Key ID generated from the Dashboard
          "name": "Ethos Sportwear",
          "description": "Test Transaction",
          "image": "https://example.com/your_logo",
          "order_id": this.orderObj.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          "handler": this.razorpayResponseHandler.bind(this),
          "prefill": {
              "name": "Gaurav Kumar",
              "email": "gaurav.kumar@example.com",
              "contact": "9999999999"
          },
          "notes": {
              "address": "Razorpay Corporate Office"
          },
          "theme": {
              "color": "#3399cc"
          }
        };

        console.log(options)

        var rzp1 = new Razorpay(options);
        rzp1.open();
      })
      
    }



  }

  redirToThankYou(){
    
  }

  razorpayResponseHandler(response: any){
    console.log(response)

    let orderObj = {
      id: this.userId,
      orderid: response.razorpay_order_id,
      paymentid: response.razorpay_payment_id,
      signature: response.razorpay_signature
    }
    console.log(orderObj);
    
    this._productService.createOrder(orderObj).subscribe(data => {
      console.log(data);
    });

    this.router.navigate(['../thankyou'], {relativeTo: this.route});

    // ProductApiService.prototype.createOrder(orderObj).subscribe(data => {
    //   console.log(data);
    // })

    // CheckoutComponent.prototype._productService.createOrder(orderObj).subscribe(data => {
    //   console.log(data);
    // })
  }

 

}


