import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
	selector: 'app-new-task',
	templateUrl: './new-task.component.html',
	styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
	private mode = 'ajout';
	private taskAdded: any;

	constructor(private authenticationService: AuthenticationService) { }

	ngOnInit() {
	}

	onSaveTask(task) {
		this.authenticationService.saveTask(task)
			.subscribe(data => {
				this.mode = 'confirmation';
				this.taskAdded = data;
			}, error => {
				console.log(error);
		});
	}
}
