import { Component } from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(private authenticationService: AuthenticationService, private router: Router) {

	}

	onLogout() {
		this.authenticationService.logout();
		this.router.navigateByUrl('/login');
	}
}
