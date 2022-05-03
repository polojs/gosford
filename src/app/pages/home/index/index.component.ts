import { Component, OnInit } from '@angular/core';

import { ModalService } from 'src/app/shared/services/modal.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

import { introSlider, brandSlider } from '../data';
import { Router } from '@angular/router';


@Component({
	selector: 'molla-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {

	products = [];
	newProducts = [];
	dealProducts = [];
	posts = [];
	loaded = false;
	introSlider = introSlider;
	brandSlider = brandSlider;

	constructor(public apiService: ApiService, public utilsService: UtilsService, private modalService: ModalService,public router: Router) {
		// this.modalService.openNewsletter();


		this.apiService.fetchProducts().subscribe(result => {
			const test = this.apiService.flattenObj(result)
			for (const el of test){
				el.variants = []
			}
			this.products = test
			this.loaded = true
		})

		// this.apiService.fetchHomeData().subscribe(result => {
		// 	// this.products = result.products;
		// 	this.dealProducts = utilsService.attrFilter(result.products, 'until').slice(0, 2);
		// 	this.newProducts = result.products.slice(0, 8);
		// 	console.log(result.blogs, "all blogs");
		// 	this.posts = result.blogs;
		// 	this.loaded = true;
		// })
	}

	changeRoute(string){
		this.router.navigateByUrl(`/${string}`)
	}

	ngOnInit(): void {
	}

	showVideoModal(event: Event) {
		event.preventDefault();
		this.modalService.showVideoModal();
	}
}
