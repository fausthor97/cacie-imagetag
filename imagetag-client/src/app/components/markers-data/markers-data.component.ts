import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-markers-data',
  templateUrl: './markers-data.component.html',
  styleUrls: ['./markers-data.component.scss'],
})
export class MarkersDataComponent implements OnInit, AfterViewInit {
  @Input() markers: any[];
  @Output() deleteMarker = new EventEmitter();
  @Output() itemMouseEnter = new EventEmitter();
  @Output() itemMouseLeave = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('#data').draggable();
  }

  noSort() {
    return 0;
  }
}
