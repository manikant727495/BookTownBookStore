import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { BookDetailComponent } from './book/book-detail/book-detail.component';
import { BookComponent } from './book/book.component';
import { CartComponent } from './cart/cart.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [ {path: 'home', component: HomepageComponent},
                          {path: 'product', component: BookComponent},
                          {path: 'product-desc/:id', component: BookDetailComponent},
                          {path: 'cart', component: CartComponent},
                          {path: 'add',component:AddBookComponent},
                          {path: '', component: HomepageComponent} ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
