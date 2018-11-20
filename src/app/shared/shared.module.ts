import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
	declarations: [FilterComponent],
	imports: [
		CommonModule,
		FontAwesomeModule
	],
	exports: [FilterComponent, FontAwesomeModule]
})
export class SharedModule {}
