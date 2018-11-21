import { Component, OnInit } from '@angular/core';

import { TopAlbumsService } from '../../core/services/top-albums.service';
import { IITune } from '../../shared/models/i-iTune';

@Component({
	selector: 'ta-albums-list',
	templateUrl: './albums-list.component.html',
	styleUrls: ['./albums-list.component.scss']
})

export class AlbumsListComponent implements OnInit {

	public filteredAlbums: IITune[];

	private albums: IITune[];


	constructor(
		private taService: TopAlbumsService
	) { }

	ngOnInit() {
		this.getData();
	}

	public handleSearch(filterValue: string): void {
		this.filteredAlbums = this.albums.filter(album => this.sortAlbum(album, filterValue));
	}

	private sortAlbum(album: IITune, filterValue: string): boolean {
		const term = filterValue.trim().toLowerCase();
		return (album.name.toLowerCase().indexOf(term) !== -1) || (album.artist.toLowerCase().indexOf(term) !== -1);
	}

	private getData(): void {
		this.taService.fetchTopAlbums()
			.subscribe(albums => {
				this.albums = albums;
				this.filteredAlbums = this.albums.slice();
			});
	}
}
