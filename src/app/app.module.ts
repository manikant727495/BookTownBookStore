import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, NgModel } from '@angular/forms';
import { AppComponent } from './app.component';
import { BookService } from './book.service';
import { HomepageComponent } from './homepage/homepage.component';
import { BookComponent } from './book/book.component';
import { BookDetailComponent } from './book/book-detail/book-detail.component';
import { CartComponent } from './cart/cart.component';
import {CartService} from './shared/cart.service';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BookComponent,
    BookDetailComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [BookService,CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
