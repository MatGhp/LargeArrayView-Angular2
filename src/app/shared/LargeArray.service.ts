import {Injectable} from '@angular/core';
import {ISampleClass} from "./models";

@Injectable()
export class LargeArrayService {


  private _state = <ISampleClass[]> {};

  constructor() {

    this._state = [];
    for (let i = 0; i < 100 * 100; i++) {

      let row = <ISampleClass>{
        id: i,
        column1: `row${i}column1`,
        column2: `row${i}column2`,
        column3: `row${i}column3`,
        column4: `row${i}column4`,
        column5: `row${i}column5`,
        column6: `row${i}column6`,
        column7: `row${i}column7`,
        column8: `row${i}column8`,
        column9: `row${i}column9`
      };
      this._state.push(row);
    }
  }

  // return mutable state
  getFakeData(): ISampleClass[] {
    return this._state;
  }

  addFakeData(sampleData: ISampleClass) {
    this._state.push(sampleData)
  }

  getLastId(): number {
    return Math.max(...this._state.map(records => records.id));
  }

  getFakeDataById(id: number): ISampleClass {
    return this._state.filter(row => row.id === id)[0];
  }

  deleteFakeData(id: number): void {
    let rowToDelete = this.getFakeDataById(id);
    let index = this._state.indexOf(rowToDelete);
    this._state.splice(index, 1);
  }

}
