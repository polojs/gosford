import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from 'src/app/shared/classes/product';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
	selector: 'product-default-page',
	templateUrl: './default.component.html',
	styleUrls: ['./default.component.scss']
})

export class DefaultPageComponent implements OnInit {

	product: Product;
	prev: Product;
	next: Product;
	related = [];
	loaded = false;

	constructor(
		public apiService: ApiService,
		private activeRoute: ActivatedRoute,
		public router: Router
	) {
		activeRoute.params.subscribe(params => {
			this.loaded = false;
			this.apiService.getProductBySlug(params['slug']).subscribe(result => {
				const old = this.apiService.flattenObj(result)
				old.variants = []
				result.nextProduct = null
				result.prevProduct = null
				result.relatedProducts = []
				console.log(result, "new");
				if (result === null) {
					this.router.navigate(['/pages/404']);
				}
				this.product = old;
				this.prev = result.prevProduct;
				this.next = result.nextProduct;
				this.related = result.relatedProducts;
				this.loaded = true;
			})
			// this.apiService.getSingleProduct(params['slug']).subscribe(result => {
			// 	console.log(result, "result");
			// 	if (result === null) {
			// 		this.router.navigate(['/pages/404']);
			// 	}

			// 	this.product = result.product;
			// 	this.prev = result.prevProduct;
			// 	this.next = result.nextProduct;
			// 	this.related = result.relatedProducts;
			// 	this.loaded = true;
			// });
		});
	}

	ngOnInit(): void {
	}
}