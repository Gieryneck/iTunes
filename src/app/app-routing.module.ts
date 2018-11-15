import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { AlbumsListComponent } from './top-albums/albums-list/albums-list.component';

const routes: Routes = [
	{ path: 'albums', component: AlbumsListComponent },
	{ path: '', redirectTo: '/albums', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
})
export class AppRoutingModule {}
