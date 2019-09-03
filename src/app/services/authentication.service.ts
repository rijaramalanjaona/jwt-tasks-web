import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AuthenticationService {
	private backEndHost = 'http://localhost:8080';
	private jwtToken = null;

	constructor(private http: HttpClient) {
	}

	login(user) {
		/**
		 * {observe : 'response'} = By default the HttpClient returns the body of the response.
		 * You can pass-in an object with an observe key set to a value of ‘response’ to get the full response.
		 */
		return this.http.post(this.backEndHost + '/login', user, {observe : 'response'});
	}

	saveToken(jwt: string) {
		this.jwtToken = jwt;
		localStorage.setItem('token', jwt);
	}

	loadToken() {
		this.jwtToken = localStorage.getItem('token');
	}

	getTasks() {
		if (this.jwtToken == null) {
			this.loadToken();
		}
		/**
		 * La requete pour recuperer les tasks a besoin de header('Authorization', token)
		 * pour fonctionner correctement dans le backEnd
		 */
		return this.http.get(this.backEndHost + '/tasks',
			{headers : new HttpHeaders({'Authorization' : this.jwtToken})});
	}

	logout() {
		localStorage.removeItem('token');
		this.jwtToken = null;
	}
}
