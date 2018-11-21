import { Component, OnInit, HostListener } from '@angular/core';

import { TopAlbumsService } from '../../core/services/top-albums.service';
import { IITune } from '../../shared/models/i-iTune';

import { debounce } from '../../shared/decorators/debounce.decorator';

@Component({
	selector: 'ta-albums-list',
	templateUrl: './albums-list.component.html',
	styleUrls: ['./albums-list.component.scss']
})

export class AlbumsListComponent implements OnInit {

	public filteredAlbumsInCols: Array<IITune[]>;
	private filteredAlbums: IITune[];
	private albums: IITune[];


	constructor(
		private taService: TopAlbumsService
	) { }

	ngOnInit() {
		this.getData();
	}

	public handleSearch(filterValue: string): void {
		this.filteredAlbums = this.albums.filter(album => this.sortAlbum(album, filterValue));
		this.triggerAssigningColums();
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
				this.triggerAssigningColums();
			});
	}

	@HostListener('window:resize', ['$event'])
	@debounce()
	private assignAlbumsToColumns(event): void {

		const width = event.target.innerWidth;
		const colCount = (width > 1600) ? 3 : (width > 1100) ? 2 : 1;
		const columns = [];

		for (let i = 0; i < colCount; i++) {
			columns.push([]);
		}

		this.filteredAlbums.forEach((album, index) => {
			columns[index % colCount].push(album);
		});

		this.filteredAlbumsInCols = columns.slice();
	}

	private triggerAssigningColums(): void {
		window.dispatchEvent( new Event('resize'));
	}
}
