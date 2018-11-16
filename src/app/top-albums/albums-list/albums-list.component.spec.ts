import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';

import { TopAlbumsService } from '../../core/services/top-albums.service';
import { AlbumsListComponent } from './albums-list.component';
import { ListItemComponent } from '../list-item/list-item.component';

import { of } from 'rxjs';

describe('AlbumsListComponent', () => {
	let component: AlbumsListComponent;
	let fixture: ComponentFixture<AlbumsListComponent>;
	let mockTAService;
	let mockResponse;
	let mockListData;

	beforeEach(() => {

		mockTAService = jasmine.createSpyObj(['fetchTopAlbums', 'createAlbumsList']);

		mockResponse = [
			{
				category: 'mock-category-1',
				artist: 'mock-artist-1',
				photo: 'mock-photo-1',
				numberOfSongs: 1,
				name: 'mock-name-1',
				price: 'mock-price-1',
				releaseDate: 'mock-releaseDate-1',
				link: 'mock-link-1',
				rights: 'mock-rights-1',
				title: 'mock-title-1',
			},
			{
				category: 'mock-category-2',
				artist: 'mock-artist-2',
				photo: 'mock-photo-2',
				numberOfSongs: 2,
				name: 'mock-name-2',
				price: 'mock-price-2',
				releaseDate: 'mock-releaseDate-2',
				link: 'mock-link-2',
				rights: 'mock-rights-2',
				title: 'mock-title-2',
			}
		];

		mockListData = [
			{
				name: 'mock-name-1',
				artist: 'mock-artist-1'
			},
			{
				name: 'mock-name-2',
				artist: 'mock-artist-2'
			}
		];

		TestBed.configureTestingModule({
			declarations: [AlbumsListComponent, ListItemComponent],
			imports: [SharedModule],
			providers: [{provide: TopAlbumsService, useValue: mockTAService}]
		});

		fixture = TestBed.createComponent(AlbumsListComponent);
		component = fixture.componentInstance;

		mockTAService.fetchTopAlbums.and.returnValue(of(mockResponse));
		mockTAService.createAlbumsList.and.returnValue(mockListData);

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
