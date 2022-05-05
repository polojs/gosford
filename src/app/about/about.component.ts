import { Component, OnInit } from '@angular/core';
import { iconBoxes, brands, members, counters } from '../pages/others/about-two/about-two-data';

@Component({
  selector: 'molla-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  iconBoxes = iconBoxes;
	brands = brands;
	members = members;
	counters = counters;

}
