import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	private mode = 'success';

	constructor(private authenticationService: AuthenticationService, private router: Router) { }

	ngOnInit() {
	}

	onLogin(dataForm) {
		console.log(dataForm);
		this.authenticationService.login(dataForm)
			.subscribe(resp => {
				const jwt = resp.headers.get('Authorization');
				this.authenticationService.saveToken(jwt);
				this.router.navigateByUrl('/tasks');
			}, err => {
				console.log(err);
				this.mode = 'error';
			});
	}

}
