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
  getBookById(id: string):Observable<Book>
  {
   // console.log(id);
    return this.http.get<Book>('http://localhost:3000/api/books/'+ id);
  }


  addBook(newBook: any)
  {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post<any>('http://localhost:3000/api/book',newBook);
  }

  deleteBook(id: string)
  {
    return this.http.delete<any>('http://localhost:3000/api/book/'+id);
  }

  updateBook(id:string, newBook:any){
    console.log(id);
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    var url = 'http://localhost:3000/api/books/update/'+id;
    return this.http.put<any>(url, newBook);
  }
}
