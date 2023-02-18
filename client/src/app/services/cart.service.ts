import { Injectable } from '@angular/core';
import { Book } from '../Book';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public books:Book[]=[];
  constructor() { }
  setbookcart(data:Book){
    this.books.push(data);
  }

  getbookcart(){
   return this.books;
  }
}