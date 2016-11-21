import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subject, Subscription} from "rxjs/Rx";
import {ISampleClass} from "../../shared/models";
import {LargeArrayService} from "../../shared/LargeArray.service";

@Component({
  selector: 'lva-showdataonce',
  templateUrl: 'showdataonce.component.html',
  styles: [``]
})
export class ShowDataOnceComponent implements OnInit, OnDestroy {
  source = <ISampleClass[]>{};

  clickDelete$ = new Subject();
  clickAdd$ = new Subject();

  private deleteSubscription: Subscription;
  private addSubscription: Subscription;

  constructor(private _largeArrayService: LargeArrayService) {
    this.deleteSubscription = this.clickDelete$
      .subscribe((id: number) => {
        let rowToDelete = this.source.filter(row => row.id === id)[0];
        let index = this.source.indexOf(rowToDelete);
        this.source.splice(index, 1);
      });

    this.addSubscription = this.clickAdd$.subscribe(() => this.onAddNewRecord());
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


  ngOnInit() {
    this.source = this._largeArrayService.getFakeDataInOnce();
  }

  ngOnDestroy() {
    this.deleteSubscription.unsubscribe();
    this.addSubscription.unsubscribe();
  }
}
