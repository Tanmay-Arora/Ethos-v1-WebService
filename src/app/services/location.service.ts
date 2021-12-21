import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  url:string = 'https://api.postalpincode.in/pincode';
  
  getLocation(pincode: string){
    return this.http.get(`${this.url}/${pincode}`).pipe(map((res:any) => {
      return res[0].PostOffice[0].District;
    }));
  }



}
