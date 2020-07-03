import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'range-input',
  templateUrl: './range-input.component.html',
  styleUrls: ['./range-input.component.css']
})
export class RangeInputComponent {
  @Input('value') value: number;
  @Input('min') min: number = 0;
  @Input('max') max: number = 1;
  @Input('step') step: number = 0.01;
  @Output('change') change: EventEmitter<any> = new EventEmitter();

  onChange(): void {
    this.change.emit();
  }
}
