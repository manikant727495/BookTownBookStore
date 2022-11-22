import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import { Location } from '@angular/common';
import { Book } from '../Book';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public id: string = this.route.snapshot.params.id;
  public book: Book = new Book;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.bookService.getBookById(this.id)
    .subscribe((data)=>{
        this.book = data;
      });
  }

  updateBook(formValues: any){
    let newBook: Book = <Book>formValues;
    newBook._id = this.id;
    console.log(newBook);
    this.bookService.updateBook(this.id,newBook)
    .subscribe((data)=>{
      this.location.back();
    })
  }

}
