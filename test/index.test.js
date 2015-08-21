import ccb from '../src/index';

describe('ccb', function () {
  it('throws an error if login and password not provided', function () {
    expect(() => {
      let myCcb = new ccb();
    }).to.throw(/must include login, password and church/);
  });
});
