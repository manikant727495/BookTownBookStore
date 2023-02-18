import { Component, OnInit } from '@angular/core';
import { Book } from '../Book';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 books:Book[]=[];
   imageWidth: number = 50;
  imageMargin: number = 2;
  constructor(private cartService:CartService) { }



  ngOnInit(): void {
   this.books = this.cartService.getbookcart();
  }
  onDelete(book:Book){
    let index = this.books.indexOf(book);
    this.books.splice(index, 1);

  }

}
