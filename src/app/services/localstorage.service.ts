import { Injectable } from '@angular/core';

const id = 'userid'

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }
  setInStorage(attribute: string, data: any) {
    sessionStorage.setItem(attribute, JSON.stringify(data));
  }

  getFromStorage(attribute: string) {
    let temp: string = sessionStorage.getItem(attribute) || '';
    //console.log(temp);
    if(temp !== ''){
      return JSON.parse(temp);
    }
    else{
      return '';
    }
    
  }

  removeFromStorage(attribute: string) {
    return sessionStorage.removeItem(attribute);
  }

  clear() {
    return sessionStorage.clear();
  }
}
