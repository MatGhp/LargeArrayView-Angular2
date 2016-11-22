import {Component, OnInit, OnDestroy} from '@angular/core';
import {ISampleClass} from "../../shared/models";
import {Subject, Subscription} from "rxjs";
import {LargeArrayService} from "../../shared/LargeArray.service";

@Component({
  selector: 'lva-showliverender',
  templateUrl: './showliverender.component.html'
})
export class ShowLiveRenderComponent implements OnInit, OnDestroy {

  private updateSubscription: Subscription;

  clickDelete$ = new Subject();
  clickAdd$ = new Subject();
  chunkData$ = new Subject();

  private deleteSubscription: Subscription;
  private addSubscription: Subscription;

  private sourceData: ISampleClass[] = [];
  private displayData: ISampleClass[] = [];

  constructor(private _largeArrayService: LargeArrayService) {
    this.sourceData = this._largeArrayService.getFakeData();

    this.updateSubscription = this.chunkData$
      .subscribe((data: ISampleClass[]) => {
        console.log(data.length);
        this.appendData(data);
      });

    this.startSlicingData(500);

    this.deleteSubscription = this.clickDelete$
      .subscribe((id: number) => {
        let rowToDelete = this.sourceData.filter(row => row.id === id)[0];
        let index = this.sourceData.indexOf(rowToDelete);
        this.sourceData.splice(index, 1);
        this.displayData.splice(index, 1);
      });

    this.addSubscription = this.clickAdd$.subscribe(() => this.onAddNewRecord());
  }


  onAddNewRecord() {
    let newId = this._largeArrayService.getLastId() + 1;
    let newRow = <ISampleClass>{
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
    };
    this._largeArrayService.addFakeData(newRow);
    this.displayData.push(newRow);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.deleteSubscription.unsubscribe();
    this.addSubscription.unsubscribe();
    this.updateSubscription.unsubscribe();
  }

  startSlicingData(chunkSize: number): void {
    this.appendData(this.getNextChunk(chunkSize));
    setInterval(()=> {

      if (this.displayData.length < this.sourceData.length) {
        this.chunkData$.next(this.getNextChunk(chunkSize));
      }
      else {

      }
    }, 0);
  }

  private getNextChunk(chunkSize: number): ISampleClass[] {
    const endIndex = this.displayData.length + chunkSize;
    return this.sourceData.slice(this.displayData.length, endIndex);
  }

  private appendData(data: ISampleClass[]) {
    this.displayData.splice(this.displayData.length, 0, ...data);
  }
}
