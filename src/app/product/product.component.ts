import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../models/cart';
import { Product } from '../models/product';
import { specification } from '../models/specification.model';
import { LocalstorageService } from '../services/localstorage.service';
import { ProductApiService } from '../services/product-api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private _productService: ProductApiService, private _sessionStorage: LocalstorageService) { }

  product!: Product;
  specs!: any[];
  quantity!: string;
  size!:string;

  addedToCart: boolean = false;

  setSize(val:string){
    this.size = val;
  }

  setQuantity(val: string){
    this.quantity = val;
  }

  addToCart(id:String, name:String, price:String, image:String){
    let uid:string = '';
    let eid:string = '';
    let userObj = this._sessionStorage.getFromStorage('user');
    if(userObj === ''){
      this.router.navigate(['/users/login'], {relativeTo: this.route})
    }
    else{
      uid = userObj.phone;
      eid = userObj.email;
    }

    let productidInp = id;
    let productnameInp = name;
    let productpriceInp = price;
    let productimageInp = image;
    let sizeInp = this.size;
    let quantityInp = this.quantity;

    let cart: Cart = {
      userid: uid,
      email: eid,
      productid: productidInp,
      productname: productnameInp,
      productprice: productpriceInp,
      quantity: quantityInp,
      size: sizeInp,
      productimage: productimageInp
    }

    this._productService.addProductToCart(cart).subscribe((data) => {
      this.addedToCart = true;
    }, (error) => {
      this.addedToCart = false;
      console.log(error);
    });

    setTimeout(() => {
      this.router.navigate(['../../cart'], {relativeTo: this.route});
    }, 1000);
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    let id = this.route.snapshot.paramMap.get('id');
    this._productService.getProduct(id).subscribe((data) => {
      this.product = data;
      console.log(data);
    })
    this._productService.getSpecs(id).subscribe((data) => {
      this.specs = data.spec.split(',');
      console.log(data);
    })
    this.quantity = '1';
    this.size = '6';
  }

}
