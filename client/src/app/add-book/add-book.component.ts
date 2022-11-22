import { Component, OnInit } from '@angular/core';
import { Book } from '../Book';
import {BookService} from '../book.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  book_name!:string
  author_name!:string ;
  price!:string ;
  starRating!:string ;

  constructor(private bookService: BookService,
              private location: Location
              ) { }

  ngOnInit(): void {
  }

  saveBook(formValues: any): void {
    let newBook: Book = <Book>formValues;
    newBook._id = '0';

    this.bookService.addBook(newBook)
      .subscribe(
        (data: Book) => this.location.back(),
        (err: any) => console.log(err)
      );
  }
}
