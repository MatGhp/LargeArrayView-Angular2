import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subject, Subscription} from "rxjs/Rx";
import {ISampleClass} from "../../shared/models";
import {LargeArrayService} from "../../shared/LargeArray.service";

@Component({
  selector: 'lva-showinfinitescroll',
  templateUrl: 'showinfinitescroll.component.html',
  styles: [``]
})
export class ShowInfiniteScrollComponent implements OnInit, OnDestroy {

  clickDelete$ = new Subject();
  clickAdd$ = new Subject();

  sourceData = [];
  displayData = [];
  private deleteSubscription: Subscription;
  private addSubscription: Subscription;


  constructor(private _largeArrayService: LargeArrayService) {
    this.deleteSubscription = this.clickDelete$
      .subscribe((id: number) => {
        let rowToDelete = this.sourceData.filter(row => row.id === id)[0];
        let index = this.sourceData.indexOf(rowToDelete);
        this.sourceData.splice(index, 1);
        this.displayData.splice(index, 1);
      });

    this.addSubscription = this.clickAdd$.subscribe(() => this.onAddNewRecord());

  }

  ngOnInit() {
    this.sourceData = this._largeArrayService.getFakeData();

    const data = this.sourceData.slice(0, this.batchSize);
    this.appendData(data);
  }

  ngOnDestroy() {
    this.deleteSubscription.unsubscribe();
    this.addSubscription.unsubscribe();
  }

  onAddNewRecord() {
    let newId = this._largeArrayService.getLastId() + 1;
    this._largeArrayService.addFakeData(
      <ISampleClass>{
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
    );

  }

//----scroll
  private batchSize: number = 100;

  onScrollDown() {
    console.log('scrolled!!');
    const data = this.getNextBatch();
    this.appendData(data);
  }

  private getNextBatch(): any {
    const endIndex = this.displayData.length + this.batchSize;
    return this.sourceData.slice(this.displayData.length, endIndex);
  }

  private appendData(data: any): void {
    this.displayData.splice(this.displayData.length, 0, ...data);
  }

//-----
}
