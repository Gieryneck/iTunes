import { Component, OnInit, Input } from '@angular/core';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons/faHeadphones';
import { IITune } from '../../shared/models/i-iTune';

@Component({
	selector: 'ta-list-item',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

	@Input() public album: IITune;
	public readonly faAngleDown = faAngleDown;
	public readonly faHeadphones = faHeadphones;
	public panelOpen: boolean = false;

	constructor() { }

	ngOnInit() {
	}

	handleClick(): void {
		console.log(this.album.releaseDate);
		this.toggleExpPanel();
	}

	toggleExpPanel(): void {
		this.panelOpen = !this.panelOpen;
	}

}
