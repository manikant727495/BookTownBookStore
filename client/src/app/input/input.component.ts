import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  searchedText: string | undefined;
  isRecentSearchesEnabled = false;
  isSearchTextResultsEnabled = false;
  recentSearchedList = [];
  searchedTextResults = [];
  isSearchListLoading = false;
  searchedTextUpdate = new Subject<string>();
  numberOfCharToMakeApiCall = 1;
  debounceTimeForSearchInMs = 1000;
  staticLoaderRows = new Array(6);
  selectedInput = ["selfHelp","Novel","scienceFiction"];

  constructor(
    private searchService:SearchService,
    public router: Router,
  ) {
    this.searchedTextUpdate.pipe(
      filter(text => text.replace(/^\s+/g, '').length >= this.numberOfCharToMakeApiCall),
      debounceTime(this.debounceTimeForSearchInMs),
      distinctUntilChanged(),
      switchMap((text) => this.searchService.getAutoSuggestionList(
        {
          searchedText: text
        }
      ))
    ).subscribe((data: any) => {
      this.searchedTextResults = data;
      this.isSearchTextResultsEnabled =
      this.searchedText && this.searchedText.length >= this.numberOfCharToMakeApiCall
      ? true : false;
      this.isSearchListLoading = false;
    }, (error) => {
      this.isSearchTextResultsEnabled = true;
      this.isSearchListLoading = false;
    });
   }

  ngOnInit(): void {
    if(this.router.url !== "/"){
      this.searchService.isSearchedText$.subscribe((data) => {
       this.searchedText = data;
      })
    }

    localStorage.setItem('recentSearches', JSON.stringify(this.selectedInput));
    this.getRecentSearches();
    
  }

  
  getRecentSearches() {
    const recentSearchesStringify = localStorage.getItem('recentSearches');
    this.recentSearchedList = recentSearchesStringify !== null
    ? JSON.parse(recentSearchesStringify)
    : [];
  }

  onInputSearchFocus() {
    if (!this.searchedText) {
      this.isRecentSearchesEnabled = true;
    } else {
      this.isRecentSearchesEnabled = false;
    }
  }

  onInputSearchFocusOut() {
    this.isRecentSearchesEnabled = false;
    this.isSearchListLoading = false;
    this.isSearchTextResultsEnabled = false;
  }

  openSearchResults(searchedItem: string){
    this.searchService.setSearchedText(searchedItem);
    this.searchService.setRecentSearches(searchedItem);
    this.onInputSearchFocusOut();
    this.router.navigateByUrl('/search-results/'+searchedItem);
    this.getRecentSearches();
  }

  setSearchVariables() {
    if (this.searchedText) {
      this.searchedText = this.searchedText.replace(/^\s+/g, '');
      this.isRecentSearchesEnabled = false;
      this.isSearchTextResultsEnabled = false;
      if (this.searchedText.length >= this.numberOfCharToMakeApiCall) {
        this.isSearchListLoading = true;
      } else {
        this.isSearchListLoading = false;
        this.isSearchTextResultsEnabled = false;
      }
    } else {
      this.isSearchListLoading = false;
      this.isSearchTextResultsEnabled = false;
      this.isRecentSearchesEnabled = true;
    }
  }

}
