import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'pages-page-not-found',
	templateUrl: './page-not-found.component.html',
	styleUrls: ['./page-not-found.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class PageNotFoundComponent implements OnInit {

	constructor(public router: ActivatedRoute, private http: HttpClient, private changeDetector: ChangeDetectorRef) {
	}

	session_id = ""

	firstName = ""

	email = ""

	ngOnInit(): void {
		this.router.queryParams.subscribe(params => {
			this.session_id = params.session_id;
			this.fetchSuccessOrder(this.session_id)
		})
	}

	async fetchSuccessOrder(checkout_session: string): Promise<any>{
		const body = {checkout_session: checkout_session}
		this.http.post<any>(`${environment.SERVER_URL}/api/orders/confirm`, body).subscribe(order => {
			this.firstName = order.firstname
			this.email = order.email
			this.changeDetector.detectChanges()
		})
	}
}
