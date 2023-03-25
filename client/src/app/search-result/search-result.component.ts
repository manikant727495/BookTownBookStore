import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  isSearchResultsLoading = true;
  isNextSearchResultsLoading = false;
  searchedText :any;
  isMainSectionEnabled = false;
  searchResults = [];
  totalSearchResultsAvailable = 0;
  currentSearchResults = 0;
  numberofSearchResults = 0;
  numberOfSearchResutlsToFetchAtOnce = 50;
  filteredSearchResults = [] as any;
  numberOfSearchResults = 0;
  constructor(
    private searchService: SearchService,
    private route:ActivatedRoute
              
  ) {}

  ngOnInit(): void {
      // console.log(data);
      this.route.paramMap.subscribe(params => {
        this.searchedText = params.get("searchedText");
        this.isSearchResultsLoading = true;
        this.searchService.setSearchedText(this.searchedText);
      // this.searchedText = data;
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
