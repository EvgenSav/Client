if(process.env.NODE_ENV === "development" && module["hot"]){
  module["hot"].accept();
}
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/ngx-bootstrap/datepicker/bs-datepicker.css';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
