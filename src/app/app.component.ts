import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fieldstone',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fieldstone Juniors';
  constructor(private router: Router) {

  }

  goHome() {
    this.router.navigate(['/']);
  }
}
