import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { ItemsComponent } from './app/items.component';

bootstrapApplication(ItemsComponent, {
  providers: [provideHttpClient(), provideRouter(routes)]
}).catch(err => console.error(err));
