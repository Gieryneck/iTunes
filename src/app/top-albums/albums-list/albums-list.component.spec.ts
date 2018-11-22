import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';

import { TopAlbumsService } from '../../core/services/top-albums.service';
import { AlbumsListComponent } from './albums-list.component';
import { ListItemComponent } from '../list-item/list-item.component';

import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { FilterComponent } from '../../shared/components/filter/filter.component';
import { IITune } from '../../shared/models/i-iTune';

describe('AlbumsListComponent', () => {
	let component: AlbumsListComponent;
	let fixture: ComponentFixture<AlbumsListComponent>;
	let mockTAService;
	let mockAlbums: IITune[];

	beforeEach(() => {

		mockTAService = jasmine.createSpyObj(['fetchTopAlbums']);

		mockAlbums = [
			{
				category: 'mock-category-1',
				id: 'mock-id-1',
				artist: 'Michael Scott',
				photoUrl: 'mock-photo-1',
				numberOfSongs: '1',
				name: 'The Best Of',
				price: 'mock-price-1',
				releaseDate: 'mock-releaseDate-1',
				link: 'mock-link-1',
				rights: 'mock-rights-1',
				title: 'mock-title-1',
			},
			{
				category: 'mock-category-2',
				id: 'mock-id-1',
				artist: 'John Doe',
				photoUrl: 'mock-photo-2',
				numberOfSongs: '2',
				name: 'Some songs',
				price: 'mock-price-2',
				releaseDate: 'mock-releaseDate-2',
				link: 'mock-link-2',
				rights: 'mock-rights-2',
				title: 'mock-title-2',
			}
		];


		TestBed.configureTestingModule({
			declarations: [AlbumsListComponent, ListItemComponent],
			imports: [SharedModule],
			providers: [{provide: TopAlbumsService, useValue: mockTAService}]
		});

		fixture = TestBed.createComponent(AlbumsListComponent);
		component = fixture.componentInstance;

		mockTAService.fetchTopAlbums.and.returnValue(of(mockAlbums));

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

		function flatten(nestedArr: Array<IITune[]>) {
			return nestedArr.reduce((acc, curr) => {
				return acc.concat(curr);
			}, []);
		}

		it('should filter list of albums properly, not caring about whitespace at the ends of string or lowercase/uppercase', fakeAsync(() => {

			component.handleSearch(' mich ');
			flush();

			expect(flatten(component.filteredAlbumsInCols)).toContain(mockAlbums[0]);
			expect(flatten(component.filteredAlbumsInCols)).not.toContain(mockAlbums[1]);
		}));

		it('should not change list of albums if provided whitespace only', fakeAsync(() => {
			component.handleSearch('    	');

			flush();

			expect(flatten(component.filteredAlbumsInCols).length).toBe(2);
		}));
	});
});
