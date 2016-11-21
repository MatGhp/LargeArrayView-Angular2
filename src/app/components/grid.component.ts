import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ISampleClass} from "../shared/models";

@Component({
  selector: 'lva-grid',
  templateUrl: 'grid.component.html',
  styles: [``]
  //to improve the performance in such a scenario, it's recommended to use OnPush strategy
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent implements OnInit {
@Input() datasource : ISampleClass[] = [];
@Output() onDelete = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

}
