import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Address } from '../models/address';
import { LocalstorageService } from '../services/localstorage.service';
import { ProductApiService } from '../services/product-api.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  constructor(private fb: FormBuilder, private _sessionStorage: LocalstorageService, private _productService: ProductApiService) { }

  userId!:string;

  addresses:any;

  setDefaultAddress:boolean = false

  getUserDetail(){
    let data = this._sessionStorage.getFromStorage('user');
    console.log(data);
    this.userId = data === '' ? '' : data.phone;
  }

  addressForm = this.fb.group({
    name: ['', Validators.required],
    addressLine1: ['', Validators.required],
    addressLine2: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    pincode: ['', [Validators.required, Validators.email]]
  });


  get name() {
    return this.addressForm.get('name');
  }

  get addressLine1() {
    return this.addressForm.get('addressLine1');
  }

  get addressLine2() {
    return this.addressForm.get('addressLine2');
  }

  get city() {
    return this.addressForm.get('city');
  }

  get state() {
    return this.addressForm.get('state');
  }

  get pincode() {
    return this.addressForm.get('pincode');
  }

  updateAddress(){}
  deleteAddress(){}

  onSubmit(){
    let address: Address = {
      userid: this.userId,
      name: this.name?.value,
      addr: `${this.addressLine1?.value}, ${this.addressLine2?.value}`,
      city: this.city?.value,
      state: this.state?.value,
      pincode: this.pincode?.value
    } 
    

    this._productService.addAddress(address).subscribe(data => {
      console.log(data);
    })
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  ngOnInit(): void {
    this.getUserDetail();
    this._productService.fetchAddress(this.userId).subscribe((data) => {
      this.addresses = data;
      if(!(this.addresses)){
        this.setDefaultAddress = true;
      }
      console.log(this.setDefaultAddress);
      console.log(data);
    });
  }

}
