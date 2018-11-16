import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { IITuneDTO } from '../../shared/models/i-itune-dto';
import { IITune } from '../../shared/models/i-iTune';
import { ListItem } from '../../shared/models/i-list-item';

@Injectable()
export class TopAlbumsService {

	private readonly topAlbumsUrl: string = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

	constructor(
		private http: HttpClient
	) { }

	public fetchTopAlbums(): Observable<IITune[]> {
		return this.http.get(this.topAlbumsUrl)
			.pipe(
				retry(2),
				catchError(this.handleError),
				map((resp: { feed: { entry: IITuneDTO[]}}) => resp.feed.entry.map((dto: IITuneDTO) => this.mapToITuneModel(dto)))
			);
	}

	public createAlbumsList(albums: IITune[]): ListItem[] {
		return albums.map(album => ({name: album.name, artist: album.artist}));
	}

	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			console.error('An error occured:', error.error.message);
		} else {
			console.error( `Backend returned code ${error.status}, ` + `error was: ${error.error}`);
		}
		return throwError('An error has occured during loading the page. Please try again later.');
	}

	private mapToITuneModel(dto: IITuneDTO): IITune {
		return {
			category: dto.category.attributes.term,
			artist: dto['im:artist'].label,
			photo: dto['im:image'][dto['im:image'].length - 1].label,
			numberOfSongs: + dto['im:itemCount'].label,
			name: dto['im:name'].label,
			price: dto['im:price'].label,
			releaseDate: dto['im:releaseDate'].label,
			link: dto.link.attributes.href,
			rights: dto.rights.label,
			title: dto.title.label
		};
	}
}
