import { Component, OnInit } from '@angular/core';
import { BookService } from "../../book.service";
import {Book} from  '../../Book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  books: Book[] =[];
  book: Book|undefined;
  filteredBook!:Book;
  id:string="6165acae6fa232a5c94b8b24";
  errorMessage:string | undefined;
  pageTitle:string | undefined;


  constructor(private bookService: BookService) {

  }
  getbook(id: string) {
    this.bookService.getBook(id).subscribe({
      next:book => this.onbookRetrieved(book),
      error: err => this.errorMessage = err
    });
  }
  onbookRetrieved(book:Book ): void {
    this.book = book;
    console.log(this.book);

    if (this.book) {
      this.pageTitle = `Product Detail: ${this.book.book_name}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }

  ngOnInit(): void {
    this.getbook(this.id);

  /*  getBook(id: String) {
      this.bookService.getBook(id).subscribe({
        next: this.book => this.onProductRetrieved(product),
        error: err => this.errorMessage = err
      });
    }
  }*/



  /*this.bookService.getBook(this.id)
  .subscribe((books: Book) =>
    {this.book = books;
      console.log(this.book);
    }
  );*/

  }
}
