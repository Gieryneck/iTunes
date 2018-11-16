import { async, ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { FilterComponent } from './filter.component';
import { By } from '@angular/platform-browser';

describe('FilterComponent', () => {
	let component: FilterComponent;
	let fixture: ComponentFixture<FilterComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FilterComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FilterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display input value correctly', () => {
		component.filterValue = 'input-value-test';
		const input = fixture.nativeElement.querySelector('input');
		fixture.detectChanges();

		expect(input.value).toBe('input-value-test');
	});

	it('should call handleInput method on keyup event, with input value as argument', () => {
		spyOn(component, 'handleInput');
		const inputDE = fixture.debugElement.query(By.css('input'));

		inputDE.triggerEventHandler('keyup', {target: {value: 'mock-text'}});
		fixture.detectChanges();

		expect(component.handleInput).toHaveBeenCalledWith('mock-text');
	});

	it('should display clear-filter-button if some search term is provided', () => {
		component.filterValue = 'some-text';

		fixture.detectChanges();
		const button = fixture.nativeElement.querySelector('.clear-filter-button');

		expect(button).not.toBeNull();
	});

	it('should not display clear-filter-button if search term is not provided', () => {
		component.filterValue = '';

		fixture.detectChanges();
		const button = fixture.nativeElement.querySelector('.clear-filter-button');

		expect(button).toBeNull();
	});

	it('should call handleClear method when clear-filter-button gets clicked on', () => {
		spyOn(component, 'handleClear');
		component.filterValue = 'mock-text';
		fixture.detectChanges();

		const buttonDE = fixture.debugElement.query(By.css('.clear-filter-button'));
		buttonDE.triggerEventHandler('click', null);

		expect(component.handleClear).toHaveBeenCalled();
	});

	describe('handleInput method', () => {
		it('should set filter input value to equal the string argument that was passed', () => {
			const input = fixture.nativeElement.querySelector('input');
			input.value = '';

			component.handleInput('some-text');
			fixture.detectChanges();

			expect(input.value).toBe('some-text');
		});

		it('should trigger emission of received string argument after 500ms', fakeAsync(() => {
			spyOn(component.termEmitter, 'emit');

			component.handleInput('some-text');
			tick(500);

			expect(component.termEmitter.emit).toHaveBeenCalledWith('some-text');
		}));
	});

	describe('handleClear method', () => {
		it('should trigger setting filter input value to empty', () => {
			component.filterValue = 'not-empty';
			const input = fixture.nativeElement.querySelector('input');

			component.handleClear();
			fixture.detectChanges();

			expect(input.value).toBe('');
		});

		it('should trigger emission of empty string after 500ms', fakeAsync(() => {
			spyOn(component.termEmitter, 'emit');
			component.filterValue = 'not-empty';

			component.handleClear();
			fixture.detectChanges();
			tick(500);

			expect(component.termEmitter.emit).toHaveBeenCalledWith('');
		}));
	});
});
