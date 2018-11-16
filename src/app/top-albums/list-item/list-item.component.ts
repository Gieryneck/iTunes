import { Component, OnInit, Input } from '@angular/core';
import { ListItem } from '../../shared/models/i-list-item';

@Component({
	selector: 'ta-list-item',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

	@Input() album: ListItem;

	constructor() { }

	ngOnInit() {
	}

}
