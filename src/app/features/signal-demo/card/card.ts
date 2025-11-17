import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  readonly toggleRedHeading = signal<boolean>(false);
  readonly parentHeader = input<string>();

  constructor() {
    console.log('from ctor', this.parentHeader());

    effect(() => {
      console.log('from effect', this.parentHeader());
    });
  }

  ngOnInit() {
    console.log('from init', this.parentHeader());
  }

  readonly currentColor = computed<'red' | 'black'>(() => {
    return this.toggleRedHeading() ? 'red' : 'black';
  });

  makeHeadingRed() {
    this.toggleRedHeading.update((prev) => !prev);
  }
}
