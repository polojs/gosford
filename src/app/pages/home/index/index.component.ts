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

		let arr = [] 

		this.apiService.fetchBlogs().subscribe(result => {
			result = this.apiService.flattenObj(result)
			for (const el of result){
				el.type = "classic"
				el.page = null
				let parts = el.date.split('-')
				el.dateObj = new Date(parts[0], parts[1], parts[2]);
			}
			console.log(result, "before");
			let dateArr = []

			const test = new Date(Math.max(...result.map(element => element.dateObj)))

			let latest = result.filter(element => {
				if(element.dateObj.toString() == test.toString()) return element})
			
			latest = [latest[0]]

			this.posts = latest
			console.log(this.posts, "posts");
		})

		// this.apiService.fetchHomeData().subscribe(result => {
		// 	this.products = result.products;
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
