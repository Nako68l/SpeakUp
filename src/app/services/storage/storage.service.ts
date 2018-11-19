import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  get(key){
    return JSON.parse(window.localStorage.getItem(key));
  }

  set(key, value){
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key){
    window.localStorage.removeItem(key);
  }
}
