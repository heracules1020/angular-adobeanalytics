import { Component } from '@angular/core';
import { EnvService } from './services/env/env.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SmartPath';
  constructor(
    private env: EnvService
  ) {
    if(env.enableDebug) {
      console.log('Debug mode enabled!');
    }
  }

}
