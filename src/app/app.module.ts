import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { TopAlbumsModule } from './top-albums/top-albums.module';

import { AppComponent } from './app.component';


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CoreModule,
		TopAlbumsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
