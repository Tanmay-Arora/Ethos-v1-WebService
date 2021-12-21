import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { LocationService } from '../services/location.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '../models/location';
import { AuthService } from '../users/user-services/auth.service';
import { LocalstorageService } from '../services/localstorage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductApiService } from '../services/product-api.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _locationService: LocationService, private _loalStorageService: LocalstorageService,private fb: FormBuilder, private _authService: AuthService, private router: Router, private route: ActivatedRoute, private _productService: ProductApiService) { }

  @ViewChild('closebutton') closebutton: any;

  navLightTabArray: String[] = ['SPORTS', 'BRANDS', 'COLLECTIONS']
  navBoldTabArray: String[] = ['MEN', 'WOMEN', 'KIDS'];
  categoryArray: string[] = ['Footwear', 'Clothing', 'Accessories', 'Sports'];

  loginStatus = this._loalStorageService;
  greetingText!: string;
  itemCount:number = 0;
  address:string = '';
  pincodeValue = '';


  addresses!:any
  userId!:string;
  userName!:string;

  pincodeForm = this.fb.group({
    pincode: ['', Validators.required]
  });

  get pincode() {
    return this.pincodeForm.get('pincode');
  }

  setGreetingText() {
    let data = this._loalStorageService.getFromStorage('user');
    console.log(data);
    this.greetingText = data === '' ? 'Sign In' : data.name;
    console.log(this.greetingText);
  }

  setAddress() {
    let fetchAddress = this._loalStorageService.getFromStorage('address');
    this.address = fetchAddress === '' ? 'select your address' : `${fetchAddress.district}, ${fetchAddress.pincode}`;
  }

  getUserDetail(){
    let data = this._loalStorageService.getFromStorage('user');
    console.log(data);
    this.userId = data === '' ? '' : data.phone;
    this.userName = data === '' ? '' : data.name;
  }

  fetchLocationByPincode() {
    this._loalStorageService.removeFromStorage('address');
    this.pincodeValue = this.pincode?.value;
    this._locationService.getLocation(this.pincode?.value).subscribe( data => {
      let enteredLoc: Location = {
        district: data,
        pincode: this.pincode?.value
      }
      this._loalStorageService.setInStorage('address', enteredLoc)
      this.setAddress();
      //this.address = `${data}, ${this.pincodeValue}`;
    });
    setTimeout(() => {
      this.closebutton.nativeElement.click();
    }, 200);
  }

  _initLogout() {
    this._authService.logout();
    setTimeout(() => {
       window.location.reload();
    }, 1000);
  }

  ngOnInit(): void {
    this.setAddress();
    this.setGreetingText();
    this.getUserDetail();
    // this._productService.fetchAddress(this.userId).subscribe((data) => {
    //   this.addresses = data;
    //   console.log(data);
    // })
    console.log(this.userId)
    this._productService.fetchAddress(this.userId).subscribe((data) => {
      this.addresses = data;
      console.log(data);
    });
  }


}
