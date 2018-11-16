import { TestBed } from '@angular/core/testing';

import { TopAlbumsService } from './top-albums.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TopAlbumsService', () => {
	let service: TopAlbumsService;
	let httpTestingController: HttpTestingController;

	const url = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [TopAlbumsService]
		});

		httpTestingController = TestBed.get(HttpTestingController);
		service = TestBed.get(TopAlbumsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('fetchTopAlbums method', () => {

		it('should call GET with the correct url', () => {
			service.fetchTopAlbums().subscribe();

			httpTestingController.expectOne(url);
		});

	});
});
