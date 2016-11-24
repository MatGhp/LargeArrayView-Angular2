import {Component, OnInit, OnDestroy, ViewChild, AfterViewInit} from '@angular/core';
import {Subscription} from "rxjs/Rx";
import {ISampleClass} from "../../shared/models";
import {LargeArrayService} from "../../shared/LargeArray.service";
import {GridComponent} from "../grid.component";

@Component({
  selector: 'lva-showinfinitescroll',
  templateUrl: 'showinfinitescroll.component.html',
  styles: [``]
})
export class ShowInfiniteScrollComponent implements OnInit, OnDestroy,AfterViewInit  {
  sourceData = [];

  private deleteSubscription: Subscription;
  private addSubscription: Subscription;

  @ViewChild('datagrid')
  private _grid : GridComponent;

  private displayRowNumber = 150;

  constructor(private _largeArrayService: LargeArrayService) {}

  ngOnInit() {
    this.sourceData = this._largeArrayService.getFakeData();
  }

  ngAfterViewInit() {
    this.deleteSubscription = this._grid.deleteObservable$
      .subscribe((id: number) => {
        this._largeArrayService.deleteFakeData(id);
      });

    this.addSubscription = this._grid.addNewObservable$
      .subscribe((data : ISampleClass) => this._largeArrayService.addFakeData(data));
  }

  ngOnDestroy() {
    this.deleteSubscription.unsubscribe();
    this.addSubscription.unsubscribe();
  }

}
