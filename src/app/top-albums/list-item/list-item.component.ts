import { Component, Input, Output, EventEmitter } from '@angular/core';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons/faHeadphones';

import { IITune } from '../../shared/models/i-iTune';

@Component({
	selector: 'ta-list-item',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

	@Input() public album: IITune;
	@Output() public openedEmitter: EventEmitter<string> = new EventEmitter<string>();

	public readonly faAngleDown = faAngleDown;
	public readonly faHeadphones = faHeadphones;
	public isPanelOpen: boolean = false;

	public handleClick(): void {
		this.toggleExpPanel();

		if (this.isPanelOpen) {
			this.notifyAboutOpening();
		}
	}

	public toggleExpPanel(): void {
		this.isPanelOpen = !this.isPanelOpen;
	}

	private notifyAboutOpening(): void {
		this.openedEmitter.emit(this.album.id);
	}

}
