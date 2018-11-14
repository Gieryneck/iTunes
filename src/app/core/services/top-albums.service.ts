import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
				map((resp: { feed: { entry: IITuneDTO[]}}) => resp.feed.entry.map((dto: IITuneDTO) => this.mapToITuneModel(dto)))
			);
	}

	public createAlbumsList(albums: IITune[]): ListItem[] {
		return albums.map(album => ({name: album.name, artist: album.artist}));
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
