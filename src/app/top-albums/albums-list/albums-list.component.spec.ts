import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';

import { TopAlbumsService } from '../../core/services/top-albums.service';
import { AlbumsListComponent } from './albums-list.component';
import { ListItemComponent } from '../list-item/list-item.component';

import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { FilterComponent } from '../../shared/components/filter/filter.component';

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
				artist: 'Michael Scott',
				photo: 'mock-photo-1',
				numberOfSongs: 1,
				name: 'The Best Of',
				price: 'mock-price-1',
				releaseDate: 'mock-releaseDate-1',
				link: 'mock-link-1',
				rights: 'mock-rights-1',
				title: 'mock-title-1',
			},
			{
				category: 'mock-category-2',
				artist: 'John Doe',
				photo: 'mock-photo-2',
				numberOfSongs: 2,
				name: 'Some songs',
				price: 'mock-price-2',
				releaseDate: 'mock-releaseDate-2',
				link: 'mock-link-2',
				rights: 'mock-rights-2',
				title: 'mock-title-2',
			}
		];

		mockListData = [
			{
				name: 'The Best Of',
				artist: 'Michael Scott'
			},
			{
				name: 'Some songs',
				artist: 'John Doe'
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

	it('should display filter component', () => {
		const filter = fixture.debugElement.query(By.directive(FilterComponent));
		expect(filter).not.toBeNull();
	});

	it('should display list item for each album in the filtered albums list', () => {
		const listItemsDE = fixture.debugElement.queryAll(By.directive(ListItemComponent));
		expect(listItemsDE.length).toBe(2);
	});

	describe('handleSearch method', () => {
		it('should filter list of albums properly, not caring about whitespace at the ends of string or lowercase/uppercase', () => {

			component.handleSearch(' mich ');

			expect(component.filteredListData).toContain(mockListData[0]);
			expect(component.filteredListData).not.toContain(mockListData[1]);
		});

		it('should not change list of albums if provided whitespace only', () => {
			component.handleSearch('    	');

			expect(component.filteredListData.length).toBe(2);
		});
	});
});
