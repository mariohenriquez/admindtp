import { AdminDtpPage } from './app.po';

describe('admin-dtp App', function() {
  let page: AdminDtpPage;

  beforeEach(() => {
    page = new AdminDtpPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
