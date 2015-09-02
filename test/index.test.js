import Ccb from '../src/index';

describe('Ccb Api', function () {
  const VALID_OPTIONS = {
    login: 'myLogin',
    password: 'myPassword',
    church: 'myChurch'
  };

  it('throws an error if login and password not provided', function () {
    expect(() => {
      let myCcb = new Ccb();
    }).to.throw(/must include login, password and church/);
  });

  it('exposes a group resource', function () {
    let myCcb = new Ccb(VALID_OPTIONS);

    expect(myCcb).to.respondTo('group');
  });

  it('exposes a groups resource', function () {
    let myCcb = new Ccb(VALID_OPTIONS);

    expect(myCcb).to.respondTo('groups');
  });
});
