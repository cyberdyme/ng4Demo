import { Ng4DemoPage } from './app.po';

describe('ng4-demo App', function() {
  let page: Ng4DemoPage;

  beforeEach(() => {
    page = new Ng4DemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
