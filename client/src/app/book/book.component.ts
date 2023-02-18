import { Component, OnInit } from '@angular/core';
import { BookService } from "../book.service";
import {Book} from  '../Book';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
  })
export class BookComponent implements OnInit {
  books: Book[] =[];
  book: Book | undefined;
  cartBook:Book[]=[];

  pageTitle: string = 'Book List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage :boolean = true;

  private _listFilter: string = '';
  filteredBook: Book[]=[];

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredBook= this.performFilter(value);
  }

  constructor(
    private bookService: BookService,
    private cartService:CartService,
    ) {
    }

  ngOnInit(): void {
    this.bookService.getBookss()
    .subscribe((books: Book[]) =>{
      this.books = books;
      this.filteredBook=this.books;
    })
  }

  performFilter(filterBy: string): Book[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.books.filter((book: Book) =>
      book.book_name.toLocaleLowerCase().includes(filterBy));
  }

  toggleImage():void{
    this.showImage = !this.showImage;
  }

  addtocart(book:Book){
    this.cartService.setbookcart(book);
  }

  deleteBook(book:any){
    this.bookService.deleteBook(book._id)
    .subscribe((data)=>{
      location.reload();
    });
  }
}
