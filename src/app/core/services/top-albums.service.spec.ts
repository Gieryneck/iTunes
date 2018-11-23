import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TopAlbumsService } from './top-albums.service';

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

		it('should return properly mapped data', () => {
			let processedData;

			const respBody = {
				category: {
					attributes: {
						'im:id': 'string',
						label: 'string',
						scheme: 'string',
						term: 'Jazz',
					},
				},

				id: {
					label: 'string',
					attributes: {
						'im:id': '123'
					}
				},

				'im:artist': {
					label: 'Michael Scott',
					attributes: {
						href: 'string'
					}
				},

				'im:contentType': {
					attributes: {
						term: 'string',
						label: 'string'
					},
					'im:contentType': {
						attributes: {
							term: 'string',
							label: 'string'
						}
					}
				},

				'im:image': [{
					label: 'expected-photo-url',
					attributes: {
						height: 'string'
					}
				}],

				'im:itemCount': {
					label: '10'
				},

				'im:name': {
					label: 'Best Of'
				},

				'im:price': {
					label: '$3.33',
					attributes: {
						amount: 'string',
						currency: 'string'
					}
				},

				'im:releaseDate': {
					label: '23-11-2018',
					attributes: {
						label: 'string'
					}
				},

				link: {
					attributes: {
						href: 'expected-href',
						rel: 'string',
						type: 'string'
					}
				}
			};

			const expectedData = [{
				artist: 'Michael Scott',
				category: 'Jazz',
				id: '123',
				link: 'expected-href',
				name: 'Best Of',
				numberOfSongs: '10',
				photoUrl: 'expected-photo-url',
				price: '$3.33',
				releaseDate: '23-11-2018'
			}];

			service.fetchTopAlbums().subscribe(data => processedData = data);
			const request = httpTestingController.expectOne(url);

			request.flush({ feed: { entry: [respBody]}});

			expect(processedData).toEqual(expectedData);
		});

	});
});
