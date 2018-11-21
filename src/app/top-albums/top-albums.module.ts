import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsListComponent } from './albums-list/albums-list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [AlbumsListComponent, ListItemComponent],
	imports: [
		CommonModule,
		SharedModule
	]
})

export class TopAlbumsModule { }
