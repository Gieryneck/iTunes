import { TestBed } from '@angular/core/testing';

import { TopAlbumsService } from './top-albums.service';

describe('TopAlbumsService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: TopAlbumsService = TestBed.get(TopAlbumsService);
		expect(service).toBeTruthy();
	});
});
