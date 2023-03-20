import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  isSearchResultsLoading = true;
  isNextSearchResultsLoading = false;
  searchedText = '';
  isMainSectionEnabled = false;
  searchResults = [];
  totalSearchResultsAvailable = 0;
  currentSearchResults = 0;
  numberofSearchResults = 0;
  numberOfSearchResutlsToFetchAtOnce = 50;
  filteredSearchResults = [] as any;
  numberOfSearchResults = 0;
  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.isSearchedText$.subscribe((data) => {
      console.log(data);
      this.isSearchResultsLoading = true;
      this.searchedText = data;
      if (this.searchedText) {
        this.isMainSectionEnabled = true;
        this.searchResults = [];
        this.totalSearchResultsAvailable = 0;
        this.currentSearchResults = 0;
        this.getSearchResultsList();
      } else {
        this.isSearchResultsLoading = false;
        this.isMainSectionEnabled = false;
      }
    }); 
  }

  getSearchResultsList() {
    this.isSearchResultsLoading = !this.isNextSearchResultsLoading;

    const requestBody = {
      searchText: this.searchedText
    };

    this.searchService.getSearchResultsList(requestBody)
    .subscribe((data: any) => {
      // this.searchResults = this.searchResults.concat(data.searchResults);
      console.log(data);
      this.filteredSearchResults = Object.assign([], data);
      console.log(this.filteredSearchResults);
      this.numberOfSearchResults = this.filteredSearchResults.length;
      this.isSearchResultsLoading = false;
      this.isNextSearchResultsLoading = false;
    }, (error) => {
      console.log(error);
      this.isSearchResultsLoading = false;
      this.isNextSearchResultsLoading = false;
    });
  }

  openDetailsPage(data:any){
    console.log(data);
  }

}
