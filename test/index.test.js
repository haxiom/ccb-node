import ccb from '../src/index';

describe('ccb', function () {
  it('throws an error if login and password not provided', function () {
    expect(() => {
      let myCcb = new ccb();
    }).to.throw(/must include login, password and church/);
  });

  describe('api requests', function () {
    describe('#groups', function () {
      it('gets the participants in a group', function (done) {
        let id = '17';
        let myCcb = new ccb({
          login: process.env.LOGIN,
          password: process.env.PASSWORD,
          church: process.env.CHURCH,
        });

        let myGroup = myCcb.group({ id });

        myGroup
          .getParticipants()
          .then((participants) => {
            expect(participants.length).to.be.above(1);
            done();
          })
          .catch((err) => {
            console.error(err.stack);
          })
      });
    });
  });
});
