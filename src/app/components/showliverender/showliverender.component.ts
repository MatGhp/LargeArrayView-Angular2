import {Component, OnInit, OnDestroy, ViewChild, AfterViewInit} from '@angular/core';
import {ISampleClass} from "../../shared/models";
import {Subject, Subscription} from "rxjs";
import {LargeArrayService} from "../../shared/LargeArray.service";
import {GridComponent} from "../grid.component";

@Component({
  selector: 'lva-showliverender',
  templateUrl: './showliverender.component.html'
})
export class ShowLiveRenderComponent implements OnInit, OnDestroy,AfterViewInit {

  private updateSubscription: Subscription;

  chunkData$ = new Subject();

  sourceData = [];
  displayData = [];
  private deleteSubscription: Subscription;
  private addSubscription: Subscription;

  @ViewChild('datagrid')
  private _grid: GridComponent;

  constructor(private _largeArrayService: LargeArrayService) {}

  ngOnInit() {
    this.sourceData = this._largeArrayService.getFakeData();

    this.updateSubscription = this.chunkData$
      .subscribe((data: ISampleClass[]) => {
        console.log(data.length);
        this.appendData(data);
      });

    this.startSlicingData(500);
  }

  ngAfterViewInit() {

    this.deleteSubscription = this._grid.deleteObservable$
      .subscribe((id: number) => {
        //delete store
        this._largeArrayService.deleteFakeData(id);
        //delete diplay row
        // let rowToDelete = this.displayData.filter(row => row.id === id)[0];
        // let index = this.sourceData.indexOf(rowToDelete);
        // this.displayData.splice(index, 1);
      });

    this.addSubscription = this._grid.addNewObservable$
      .subscribe((newSample: ISampleClass) => {
        this._largeArrayService.addFakeData(newSample);
        //this.displayData.push(newSample);
      });
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
    this.displayData = this.displayData.slice();
  }
}
