import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  customSay,
  team,
  brands,
} from '../pages/others/about-one/about-one-data';
import { sliderOpt } from 'src/app/shared/data';
@Component({
  selector: 'molla-shepherd',
  templateUrl: './shepherd.component.html',
  styleUrls: ['./shepherd.component.scss'],
})
export class ShepherdComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  customSay = customSay;
  brands = brands;
  team = team;
  sliderOption = {
    ...sliderOpt,
    nav: false,
    dots: true,
    margin: 20,
    loop: false,
    responsive: {
      1200: {
        nav: true,
      },
    },
  };
  teamOption = {
    ...sliderOpt,
    nav: false,
    dots: false,
    items: 3,
    margin: 20,
    loop: false,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  };
}
