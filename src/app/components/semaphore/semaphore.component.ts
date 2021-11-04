import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-semaphore',
  templateUrl: './semaphore.component.svg',
  styleUrls: ['./semaphore.component.scss']
})
export class SemaphoreComponent {
  @Input() public fillColor: string = 'rgb(255, 0, 0)';

  constructor() { }

}
