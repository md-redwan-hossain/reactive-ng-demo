import { Component } from '@angular/core';
import { Blog } from './features/signal-demo/blog/blog';

@Component({
  selector: 'app-root',
  imports: [Blog],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
