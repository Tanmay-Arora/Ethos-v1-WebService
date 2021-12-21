import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../models/product';
import { LocalstorageService } from '../services/localstorage.service';
import { ProductApiService } from '../services/product-api.service';
import { AuthService } from '../users/user-services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements AfterViewInit {

  @ViewChild('carousel') carousel?: NgbCarousel;

  product:any = []

  constructor(private _productService: ProductApiService, private router: Router, private route:ActivatedRoute, private _sessionStorage: LocalstorageService) { }

  loginStatus = this._sessionStorage

  showProduct(id:any){
    console.log(id);
    this.router.navigate([`/product/${id}`], {relativeTo: this.route});
  }

  ngAfterViewInit(): void {
    window.scrollTo(0,87);
    this._productService.getProducts().subscribe((data) => {
      console.log(data);
      this.product = data;
    })
  }
}
