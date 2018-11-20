import { Component, OnInit } from '@angular/core';

import { TopAlbumsService } from '../../core/services/top-albums.service';
import { IITune } from '../../shared/models/i-iTune';
import { ListItem } from '../../shared/models/i-list-item';

@Component({
	selector: 'ta-albums-list',
	templateUrl: './albums-list.component.html',
	styleUrls: ['./albums-list.component.scss']
})

export class AlbumsListComponent implements OnInit {

	public filteredListData: ListItem[];

	private albums: IITune[];
	private listData: ListItem[];


	constructor(
		private taService: TopAlbumsService
	) { }

	ngOnInit() {
		this.getData();
	}

	public handleSearch(filterValue: string): void {
		this.filteredListData = this.listData.filter(album => this.sortAlbum(album, filterValue));
	}

	private sortAlbum(album: ListItem, filterValue: string): boolean {
		const term = filterValue.trim().toLowerCase();
		return (album.name.toLowerCase().indexOf(term) !== -1) || (album.artist.toLowerCase().indexOf(term) !== -1);
	}

	private getData(): void {
		this.taService.fetchTopAlbums()
			.subscribe(albums => {
				this.albums = albums;
				this.listData = this.taService.createAlbumsList(albums);
				this.filteredListData = this.listData.slice();
			});
	}
}
