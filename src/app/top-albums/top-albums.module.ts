import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsComponent } from './albums/albums.component';
import { AlbumsListComponent } from './albums-list/albums-list.component';
import { ListItemComponent } from './list-item/list-item.component';

@NgModule({
	declarations: [AlbumsComponent, ListItemComponent, AlbumsListComponent],
	imports: [
		CommonModule
	]
})

export class TopAlbumsModule { }
