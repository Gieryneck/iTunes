import { Component, OnInit, Input } from '@angular/core';
import { ListItem } from '../../shared/models/i-list-item';

@Component({
	selector: 'ta-albums-list',
	templateUrl: './albums-list.component.html',
	styleUrls: ['./albums-list.component.css']
})
export class AlbumsListComponent implements OnInit {

	@Input() listData: ListItem[];

	constructor() { }

	ngOnInit() {
	}

}
