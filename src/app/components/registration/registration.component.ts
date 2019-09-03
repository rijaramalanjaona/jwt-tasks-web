import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
	private mode = 'ajout';
	private userAdded: any;
	private errorMessage: string;

	constructor(private authenticationService: AuthenticationService) { }

	ngOnInit() {
	}

	onSaveUser(user) {
		this.authenticationService.saveUser(user)
			.subscribe(data => {
				this.mode = 'confirmation';
				this.userAdded = data;
			}, error => {
				console.log(error);
				this.errorMessage = error.error.message;
			});
	}

}
