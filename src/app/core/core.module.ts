import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FetchService } from './services/fetch.service';

@NgModule({
	declarations: [],
	imports: [
		CommonModule
	],
	providers: [FetchService]
})
export class CoreModule {}
