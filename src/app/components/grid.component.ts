import {
  Component,
  OnInit, Input,
  Output,
  EventEmitter,
  trigger,
  state,
  style,
  transition,
  animate,
  OnChanges, SimpleChange
} from '@angular/core';
import {ISampleClass} from "../shared/models";
import {Subject} from "rxjs";

@Component({
  selector: 'large-grid',
  templateUrl: 'grid.component.html',
  styles: [``],
  animations: [
    trigger('gridAnimation', [

      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0
        }))
      ])
    ])

  ]

})
export class GridComponent implements OnInit, OnChanges {
  @Input() datasource: ISampleClass[] = [];
  @Input() scrollingStrategy: boolean = true;
  @Input() displayRowNumber: number = 100;
  private displaySource: ISampleClass[] = [];


  private clickDelete$ = new Subject();
  private clickAdd$ = new Subject();

  constructor() {
  }

  ngOnChanges(change: { [propName: string]: SimpleChange }) {
    //--in case the datasource is updated on the parrent side
    if(change['datasource'].currentValue !== change['datasource'].previousValue && this.scrollingStrategy===false)
    {
      this.datasource = change['datasource'].currentValue;
      this.loadData(this.datasource.length);
    }
  }

  ngOnInit() {

    if (this.scrollingStrategy) {
      this.onScrollDown();
    }
    // else {
    //   this.loadData(this.datasource.length);
    // }
  }

  get deleteObservable$() {
    return this.clickDelete$.asObservable();
  }

  get addNewObservable$() {
    return this.clickAdd$.asObservable();

  }

  private onDelete(id: number) {
    this.clickDelete$.next(id);

    let rowToDelete = this.displaySource.filter(row => row.id === id)[0];
    let index = this.displaySource.indexOf(rowToDelete);
    this.displaySource.splice(index, 1);
  }

  onAddNewRecord() {

    let newId = Math.max(...this.datasource.map(records => records.id)) + 1;
    let newSampleData = <ISampleClass>{
      id: newId,
      column1: `row${newId}column1`,
      column2: `row${newId}column2`,
      column3: `row${newId}column3`,
      column4: `row${newId}column4`,
      column5: `row${newId}column5`,
      column6: `row${newId}column6`,
      column7: `row${newId}column7`,
      column8: `row${newId}column8`,
      column9: `row${newId}column9`
    }

    //---Add record to inner data store
    this.displaySource.push(newSampleData);

    //---Send new record to subscriber
    this.clickAdd$.next(newSampleData);
  }


  onScrollDown() {
    if (this.scrollingStrategy) {
      console.log('scrolled!!');
      this.loadData(this.displayRowNumber);
    }
  }

  private loadData(rowCount: number) {
    const data = this.getNextBatch(rowCount);
    this.appendData(data);
  }

  private getNextBatch(sliceSize: number): any {
    const endIndex = this.displaySource.length + sliceSize;
    return this.datasource.slice(this.displaySource.length, endIndex);
  }

  private appendData(data: any): void {
    this.displaySource.splice(this.displaySource.length, 0, ...data);
  }
}
