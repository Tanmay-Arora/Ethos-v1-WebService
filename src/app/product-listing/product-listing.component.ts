import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductApiService } from '../services/product-api.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private _productService: ProductApiService) { }

  listingType!: string;
  products!: any;

  showProduct(id: any){
    console.log(id);
    this.router.navigate([`/product/${id}`], {relativeTo: this.route});
  }

  ngOnInit(): void {
    this.listingType = this.route.snapshot.paramMap.get('type') || '';
    if(this.listingType == ''){
      this._productService.getProducts().subscribe((data) => {
        this.products = data
      })
    }
    else{
      this._productService.getFilteredProducts(this.listingType).subscribe((data) => {
        this.products = data;
      })
    }
  }

}
