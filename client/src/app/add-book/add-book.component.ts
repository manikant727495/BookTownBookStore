import { Component, OnInit } from '@angular/core';
import { Book } from '../Book';
import {BookService} from '../book.service';

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

  constructor(private bookService: BookService) { }


  ngOnInit(): void {

  }

  saveBook(formValues: any): void {
    let newBook: Book = <Book>formValues;
    newBook._id = '0';
    console.log(newBook);

    this.bookService.addBook(newBook)
      .subscribe(
        (data: Book) => console.log(data),
        (err: any) => console.log(err)
      );
  }
}
