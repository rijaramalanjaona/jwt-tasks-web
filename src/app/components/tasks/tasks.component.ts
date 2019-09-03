import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
	selector: 'app-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
	private tasks: any;
	constructor(private authenticationService: AuthenticationService, private router: Router) { }

	ngOnInit() {
		this.authenticationService.getTasks()
			.subscribe(data => {
				this.tasks = data;
			}, error => {
				// logout pour supprimer le token au cas ou il est expire
				this.authenticationService.logout();
				this.router.navigateByUrl('/login');
			});
	}

}
