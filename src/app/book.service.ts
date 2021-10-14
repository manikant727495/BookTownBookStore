
import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Book } from './Book';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';



@Injectable({
  providedIn: 'root'
})
export class BookService {
  books: Book[] = [];

  constructor(private http: HttpClient) { }

  getBookss():Observable<Book[]>
  {
    return this.http.get<Book[]>('http://localhost:3000/api/books');

  }
  getBook(id: string):Observable<Book>
  {
    console.log(id);
    console.log(this.http.get<Book>('http://localhost:3000/api/books/'+ id));
    return this.http.get<Book>('http://localhost:3000/api/books/'+ id);

  }


  addBook(newBook: any)
  {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/book',newBook)
    .pipe(map((response: any) => response.json()));
  }

  deleteBook(id: string)
  {
    return this.http.delete('http://localhost:3000/api/book'+id)
    .pipe(map((response: any) => response.json()));
  }
}
