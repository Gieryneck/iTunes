import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { AlbumsComponent } from '../app/top-albums/albums/albums.component';

const routes: Routes = [
	{ path: 'albums', component: AlbumsComponent, },
	{ path: '', redirectTo: '/albums', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
})
export class AppRoutingModule {}
