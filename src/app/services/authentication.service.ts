import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
	private backEndHost = 'http://localhost:8080';
	private jwtToken = null;
	private roles: Array<any>;

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
		// stockage du token dans le localstorage
		localStorage.setItem('token', jwt);

		// parsing du token pour extraire les roles
		const jwtHelper = new JwtHelper();
		this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
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

	isAdmin() {
		/**
		 * roles dans le jwt de la forme
		 * {
		 *   "sub": "admin",
		 *   "exp": 1568027984,
		 *   "roles": [
		 *     {
		 *       "authority": "ADMIN"
		 *     },
		 *     {
		 *       "authority": "USER"
		 *     }
		 *   ]
		 * }
		 */
		for (const role of this.roles) {
			if (role.authority === 'ADMIN') {
				return true;
			}
		}
		return false;
	}

	saveTask(task) {
		return this.http.post(this.backEndHost + '/tasks', task,
			{headers : new HttpHeaders({'Authorization' : this.jwtToken})});
	}

	saveUser(user) {
		return this.http.post(this.backEndHost + '/register', user);
	}
}
