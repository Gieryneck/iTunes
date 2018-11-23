import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('ListItemComponent', () => {
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
			photoUrl: '../../../assets/images/imgStub.png',
			numberOfSongs: '13',
			name: 'The Best Of',
			price: '9.99$',
			releaseDate: '2018-11-16T00:00:00-07:00',
			link: 'link'
		};
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('handleClick method', () => {
		it('Should trigger toggling the expansion panel', () => {
			component.isPanelOpen = false;

			component.handleClick();

			expect(component.isPanelOpen).toBe(true);
		});

		it('Should cause sending notification about opening the expansion panel with correct id when panel is opened', fakeAsync(() => {
			spyOn(component.openedEmitter, 'emit');
			component.isPanelOpen = false;

			component.handleClick();
			flush();

			expect(component.openedEmitter.emit).toHaveBeenCalledWith(component.album.id);
		}));

		it('Should NOT send notification about opening the expansion panel if panel is closed', fakeAsync(() => {
			spyOn(component.openedEmitter, 'emit');
			component.isPanelOpen = true;

			component.handleClick();
			flush();

			expect(component.openedEmitter.emit).not.toHaveBeenCalled();
		}));
	});
});
