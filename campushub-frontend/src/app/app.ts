import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`,
  styles: [], // Fixed: Removed styleUrls entirely so it stops looking for a missing CSS file!
})
export class AppComponent {}
