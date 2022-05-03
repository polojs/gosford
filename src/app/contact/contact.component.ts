import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'molla-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

	info = {
		telephone: "",
		firstName: "",
		email: "",
    message: "",
    subject: ""
	}

  successMessage = ""

  apiLoaded: Observable<boolean>;

  center = {lat: 50.76650808641422, lng:-3.2816901984025533}

  constructor(private http: HttpClient, private changeDetector: ChangeDetectorRef) {
    this.apiLoaded = this.http.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyBzlLYISGjL_ovJwAehh6ydhB56fCCpPQw', 'callback')
		.pipe(
			map(() => true),
			catchError(() => of(false)),
		);
   }

  ngOnInit(): void {
  }

  sendMail = async () => {
    const body = this.info
    const res = await fetch(`${environment.SERVER_URL}/questions`, {
			method: 'POST',
			body: JSON.stringify(body)
		})
    this.info.telephone = ""
    this.info.firstName = ""
    this.info.email = ""
    this.info.message = ""
    this.info.subject = ""
    this.changeDetector.detectChanges()
    this.successMessage = "Thank you for your message, we will get back to you as soon as possible!"

  }

}
