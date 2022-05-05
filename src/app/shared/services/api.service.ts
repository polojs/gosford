import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class ApiService {

	constructor(private http: HttpClient) {
	}

		 public flattenObj = (data) => {
			const isObject = (data) =>
				Object.prototype.toString.call(data) === "[object Object]";
			const isArray = (data) =>
				Object.prototype.toString.call(data) === "[object Array]";
			
			const flatten = (data) => {
				if (!data.attributes) return data;
			
				return {
				id: data.id,
				...data.attributes,
				};
			};
			
			if (isArray(data)) {
				return data.map((item) => this.flattenObj(item));
			}
			
			if (isObject(data)) {
				if (isArray(data.data)) {
				data = [...data.data];
				} else if (isObject(data.data)) {
				data = flatten({ ...data.data });
				} else if (data.data === null) {
				data = null;
				} else {
				data = flatten(data);
				}
			
				for (const key in data) {
				   data[key] = this.flattenObj(data[key]);
				}
			
				return data;
			}
			
			return data;
			};
	

	
	/**
	 * Get Products
	 */
	public fetchShopData(params: any, perPage: number, initial = 'shop'): Observable<any> {
		let temp = initial;
		if (!initial.includes('?')) {
			temp += '?';
		}

		for (let key in params) {
			temp += key + '=' + params[key] + '&';
		}

		if (!params.page) {
			temp += 'page=1';
		}

		if (!params.perPage) {
			temp += '&perPage=' + perPage;
		}

		temp += '&demo=' + environment.demo;

		return this.http.get(`${environment.SERVER_URL}/${temp}`);
	}

	public fetchAllProducts(): Observable<any> {
		return this.http.get(`${environment.SERVER_URL}/api/products?populate=sm_pictures,pictures`);
	}

	/**
	 * Get Products
	 */
	public fetchBlogData(params: any, initial = 'blogs/classic', perPage: number,): Observable<any> {
		let temp = initial;
		if (!initial.includes('?')) {
			temp += '?';
		}

		for (let key in params) {
			temp += key + '=' + params[key] + '&';
		}

		if (!params.page) {
			temp += 'page=1';
		}

		if (!params.perPage) {
			temp += '&perPage=' + perPage;
		}
		console.log(temp, "temp");
		return this.http.get(`http://localhost:1337/blogs`);
	}

	/**
	 * Get Products
	 */
	public fetchSinglePost(slug: string): Observable<any> {
		return this.http.get(`${environment.SERVER_URL}/${'single/' + slug + '?demo=' + environment.demo}`);
	}


	/**
	 * Get Products for home page
	 */
	public fetchHomeData(): Observable<any> {
		return this.http.get(`http://localhost:1337/${environment.demo}`);
	}

	public fetchProducts(): Observable<any> {
		return this.http.get(`${environment.SERVER_URL}/api/products?populate=pictures,sm_pictures`)
	}

	public fetchBlogs(): Observable<any> {
		return this.http.get(`${environment.SERVER_URL}/api/blogs?populate=image`)
	}

	public getProductBySlug(slug, isQuickView = false): Observable<any>{
		return this.http.get(`${environment.SERVER_URL}/api/products/${slug}?populate=pictures,sm_pictures`);
	}

	/**
	 * Get products by demo
	 */
	public getSingleProduct(slug: string, isQuickView = false): Observable<any> {
		return this.http.get(`${environment.SERVER_URL}/products/${slug}?demo=${environment.demo}&isQuickView=${isQuickView}`);
	}

	/**
	 * Get Products
	 */
	public fetchHeaderSearchData(searchTerm: string, cat = null): Observable<any> {
		return this.http.get(`${environment.SERVER_URL}/shop?perPage=5&searchTerm=${searchTerm}&category=${cat}&demo=${environment.demo}`);
	}

	/**
	 * Get Element Products
	 */
	public fetchElementData(): Observable<any> {
		return this.http.get(`${environment.SERVER_URL}/elements/products`);
	}

	/**
	 * Get Element Blog
	 */
	public fetchElementBlog(): Observable<any> {
		return this.http.get(`${environment.SERVER_URL}/elements/blogs`);
	}

	
	public createOrder(): Observable<any>{
		return this.http.get(`${environment.SERVER_URL}/orders`)
	}
}