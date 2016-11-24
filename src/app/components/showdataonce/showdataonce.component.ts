import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Subscription} from "rxjs/Rx";
import {ISampleClass} from "../../shared/models";
import {LargeArrayService} from "../../shared/LargeArray.service";
import {GridComponent} from "../grid.component";

@Component({
  selector: 'lva-showdataonce',
  templateUrl: 'showdataonce.component.html',
  styles: [``]
})
export class ShowDataOnceComponent implements OnInit, OnDestroy {
  private sourceData = [];
  private deleteSubscription: Subscription;
  private addSubscription: Subscription;

  @ViewChild('datagrid')
  private _grid : GridComponent;

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
      .subscribe(
        (data : ISampleClass) => this._largeArrayService.addFakeData(data));
  }

  ngOnDestroy() {
    this.deleteSubscription.unsubscribe();
    this.addSubscription.unsubscribe();
  }
}
