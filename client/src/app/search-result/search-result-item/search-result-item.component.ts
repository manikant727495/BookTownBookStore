import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.css']
})
export class SearchResultItemComponent implements OnInit {

  @Input() searchResultItem: any;
  @Input() lastItem: boolean | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
