import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

	@Output() public termEmitter: EventEmitter<string> = new EventEmitter<string>();
	public filterValue: string = '';
	public readonly faTimes = faTimes;

	private readonly termSubject: Subject<string> = new Subject<string>();

	ngOnInit() {
		this.termSubject.pipe(
			debounceTime(500),
			distinctUntilChanged()
		).subscribe(term => {
			this.termEmitter.emit(term);
		} );
	}

	public onKeyUp(term: string): void {
		this.filterValue = term;
		this.termSubject.next(term);
	}

	public handleClear(): void {
		this.filterValue = '';
		this.termSubject.next('');
	}
}
