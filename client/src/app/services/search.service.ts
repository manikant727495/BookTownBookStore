import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchedText = new BehaviorSubject<string>('');
  isSearchedText$ = this.searchedText.asObservable();
  searchUrl = `http://localhost:4000/api/books`;

  constructor(private httpClient: HttpClient
  ) { }

  setSearchedText(value: string) {
      this.searchedText.next(value);
  }

  setRecentSearches(selectedInput: string) {
      const recentSearchesStringify = localStorage.getItem('recentSearches');
      const recentSearchesParse = recentSearchesStringify !== null
      ? JSON.parse(recentSearchesStringify)
      : [];
      if (recentSearchesParse && recentSearchesParse.length > 0) {
          const inputIndex = recentSearchesParse.indexOf(selectedInput);
          if (inputIndex !== -1) {
              recentSearchesParse.splice(inputIndex, 1);
          } else {
              if (recentSearchesParse.length >= 5) {
                  recentSearchesParse.pop();
              }
          }
          recentSearchesParse.unshift(selectedInput);
          localStorage.setItem(
              'recentSearches', JSON.stringify(recentSearchesParse)
          );
      } else {
          localStorage.setItem('recentSearches', JSON.stringify([selectedInput]));
      }
  }

  getAutoSuggestionList(request: any) {

      const headers = new HttpHeaders( {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      } );
      const options = {
          headers
      };
      return this.httpClient.post(
          `${this.searchUrl}/autocomplete` ,
          request,
          options
      );

  }

  getSearchResultsList(request: any) {
    const searchText = request.searchText;
    const headers = new HttpHeaders( {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    } );
    const options = {
        headers
    };

    const searchUrl = `${this.searchUrl}/search/` +
                      `${searchText}`

    return this.httpClient.get(searchUrl,
        options
    );
  }




}
