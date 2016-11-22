import {Component,
  OnInit, Input,
  Output,
  EventEmitter,
  trigger,
  state,
  style,
  transition,
  animate} from '@angular/core';
import {ISampleClass} from "../shared/models";

@Component({
  selector: 'lva-grid',
  templateUrl: 'grid.component.html',
  styles: [``],
  animations: [
    trigger('gridAnimation', [
      // state('in', style({
      //   opacity: 1,
      //   transform: 'translateX(0)'
      // })),
      // transition('void => *', [
      //   style({
      //     opacity: 0,
      //     transform: 'translateX(-100px)'
      //   }),
      //   animate(300)
      // ])
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0
        }))
      ])
    ])

]

})
export class GridComponent implements OnInit {
@Input() datasource : ISampleClass[] = [];
@Output() onDelete = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

}
