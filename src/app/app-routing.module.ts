import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './shared/layout/layout.component';
import { ComingSoonPageComponent } from './pages/others/coming-soon/coming-soon.component';
import { IndexComponent } from './pages/home/index/index.component';
import { BungalowComponent } from './bungalow/bungalow.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './pages/others/page-not-found/page-not-found.component';
import { CaravanComponent } from './caravan/caravan.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
	{
		path: 'pages/coming-soon',
		component: ComingSoonPageComponent
	},
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				component: IndexComponent
			},
			{
				path: 'bungalow',
				pathMatch: 'full',
				component: BungalowComponent
			},
			{
				path: 'caravan',
				pathMatch: 'full',
				component: CaravanComponent
			},
			{
				path: 'contact',
				pathMatch: 'full',
				component: ContactComponent
			},	
			{
				path: 'about',
				pathMatch: 'full',
				component: AboutComponent
			},			
			{
				path: 'elements',
				loadChildren: () => import( './pages/elements/elements.module' ).then( m => m.ElementsModule )
			},
			{
				path: 'blog',
				loadChildren: () => import( './pages/blog/blog.module' ).then( m => m.BlogModule )
			},
			{
				path: 'pages',
				loadChildren: () => import( './pages/others/pages.module' ).then( m => m.PagesModule )
			},
			{
				path: 'shop',
				loadChildren: () => import( './pages/shop/shop.module' ).then( m => m.ShopModule )
			},
			{
				path: 'product',
				loadChildren: () => import( './pages/product/product.module' ).then( m => m.ProductModule )
			},
		]
	},
	{
		path: '**',
		component: PageNotFoundComponent
	}
];

@NgModule( {
	imports: [ RouterModule.forRoot( routes, { useHash: false, anchorScrolling: 'disabled', scrollPositionRestoration: 'disabled' } ) ],
	exports: [ RouterModule ]
} )

export class AppRoutingModule { }