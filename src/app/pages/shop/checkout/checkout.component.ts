import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from 'src/app/shared/services/cart.service';
import { environment } from 'src/environments/environment';
import {loadStripe} from '@stripe/stripe-js'
import { async } from 'rxjs/internal/scheduler/async';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { WeekDay } from '@angular/common';

const stripePromise = loadStripe('pk_live_51KsVutLcDvWRMYZqzJBHf6u4PxRkTzGXiZ9pJMx4bqrDhtWhatPl72DPARxjjWNAxmgtkaxwbk3kgPaiSw01NCvK00xIoqlcND')

declare var $: any;

@Component({
	selector: 'shop-checkout-page',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit, OnDestroy {

	telephone = ""

	errorMessage = "Please fill in the whole form including date and time"

	radio: FormControl

	test: "" 

	markDisabled = (date: NgbDate) =>  this.getDay(date)

	minDate = {day: 0, year: 0, month: 0}


	selfPickup = true
	
	storePickup = false

	model: NgbDateStruct;

	valid = false

	date: {year: number, month: number}

	info = {
		telephone: "",
		firstName: "",
		lastName: "",
		email: "",
	}

	getDay(date){
		const disabled = [1,2, 3,7]
		console.log(this.minDate);
		if(disabled.includes(this.calendar.getWeekday(date))) return true
		return false
	}

	checkValidity(){
		let date = false
		let firstname = false
		let lastname = false
		let phone = false
		let email = false
		if(this.info.firstName){
			firstname = true
		}
		if(this.info.lastName){
			lastname = true
		}
		if(this.info.telephone){
			phone = true
		}
		if(this.info.email){
			email = true
		}
		if(this.model) date = true
		if(date && firstname && lastname && email && phone){
			this.valid = true;
			return false
		}
		// console.log("getting to here");
		return true
	}


	cartItems = [];

	private subscr: Subscription;

	constructor(public cartService: CartService, public calendar: NgbCalendar) {
		let date = new Date()
		this.minDate.year = date.getFullYear()
		this.minDate.month = date.getMonth() + 1
		this.minDate.day = date.getDate()
		console.log(this.minDate);
	}

	ngOnInit(): void {

		this.subscr = this.cartService.cartStream.subscribe(items => {
			this.cartItems = items;
		});
		document.querySelector('body').addEventListener("click", () => this.clearOpacity())
		console.log(this.cartItems, "cartitems");
	}

	changeValue(){
		this.selfPickup = !this.selfPickup
	}

	handleBuy = async () => {
		const obj = {user: this.info, product: [], date: this.model, selfPickup: this.selfPickup}
		for(const product of this.cartItems){
			console.log(product, "product");
			obj.product.push({id: product.slug, qty: product.qty})
		}
		const stripe = await stripePromise
		const res = await fetch(`${environment.SERVER_URL}/api/orders`, {
			method: 'POST',
			body: JSON.stringify(obj)
		})
		const session = await res.json()

		const result = await stripe.redirectToCheckout({
			sessionId: session.id
		})
	}


	ngOnDestroy(): void {
		this.subscr.unsubscribe();
		document.querySelector('body').removeEventListener("click", () => this.clearOpacity())
	}

	clearOpacity() {
		let input: any = document.querySelector('#checkout-discount-input');
		if (input && input.value == "") {
			let label: any = document.querySelector('#checkout-discount-form label');
			label.removeAttribute('style');
		}
	}

	addOpacity(event: any) {
		event.target.parentElement.querySelector("label").setAttribute("style", "opacity: 0");
		event.stopPropagation();

	}


	formToggle(event: any) {
		console.log("getting executed");
		const parent: HTMLElement = event.target.closest('.custom-control');
		const submenu: HTMLElement = parent.closest('.form-group').querySelector('.shipping-info');

		if (parent.classList.contains('open')) {
			$(submenu).slideUp(300, function () {
				parent.classList.remove('open');
			});
		}
		else {
			$(submenu).slideDown(300, function () {
				parent.classList.add('open');
			});
		}

		event.preventDefault();
		event.stopPropagation();
	}
}
