import { Component, OnInit, Input } from '@angular/core';
import { ListItem } from '../../shared/models/i-list-item';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';

@Component({
	selector: 'ta-list-item',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

	@Input() public album: ListItem;
	public readonly faAngleDown = faAngleDown;
	public panelOpen: boolean = false;

	constructor() { }

	ngOnInit() {
	}

	handleClick(): void {
		console.log(this.album.id);
		this.toggleExpPanel();
	}

	toggleExpPanel(): void {
		this.panelOpen = !this.panelOpen;
	}

}
