import { Component, OnInit, Input } from '@angular/core';
import { IITune } from '../../shared/models/i-iTune';

@Component({
	selector: 'ta-list-item',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

	@Input() album: IITune;

	constructor() { }

	ngOnInit() {
	}

}
