import Ccb from '../src/index';

describe('Ccb', function () {
  it('throws an error if login and password not provided', function () {
    expect(() => {
      let myCcb = new Ccb();
    }).to.throw(/must include login, password and church/);
  });
});
