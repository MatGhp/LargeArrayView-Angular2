import { Angular2LargeArrayViewPage } from './app.po';

describe('angular2-large-array-view App', function() {
  let page: Angular2LargeArrayViewPage;

  beforeEach(() => {
    page = new Angular2LargeArrayViewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
