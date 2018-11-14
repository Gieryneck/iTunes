import { Component, OnInit } from '@angular/core';

import { TopAlbumsService } from '../../core/services/top-albums.service';
import { IITune } from '../../shared/models/i-iTune';
import { ListItem } from '../../shared/models/i-list-item';

@Component({
	selector: 'ta-albums',
	templateUrl: './albums.component.html',
	styleUrls: ['./albums.component.css']
})

export class AlbumsComponent implements OnInit {

	private albums: IITune[];
	public listData: ListItem[];

	constructor(
		private taService: TopAlbumsService
	) { }

	ngOnInit() {
		this.getData();
	}

	private getData(): void {
		this.taService.fetchTopAlbums()
			.subscribe(albums => {
				this.albums = albums;
				this.listData = this.taService.createAlbumsList(albums);
			});
	}

}
