import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('ItemComponent', () => {
	let component: ListItemComponent;
	let fixture: ComponentFixture<ListItemComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ListItemComponent],
			imports: [FontAwesomeModule]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ListItemComponent);
		component = fixture.componentInstance;
		component.album = {
			category: 'rock',
			id: 'fake-id',
			artist: 'Michael Scott',
			photoUrl: 'fake-url',
			numberOfSongs: '13',
			name: 'The Best Of',
			price: '9.99$',
			releaseDate: '2018-11-16T00:00:00-07:00',
			link: 'link',
			rights: 'rights',
			title: 'title',
		};
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
