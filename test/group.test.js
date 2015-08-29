import {readFixture} from './support/fixture-helper';
import Connection from '../src/connection';
import Group from '../src/group';

describe('Group', () => {
  let ccb;
  let fixture = readFixture('group-response.xml');
  let connection = new Connection({
    login: 'myLogin',
    password: 'myPassword',
    church: 'myChurch'
  });

  beforeEach(() => {
    ccb = nock('https://mychurch.ccbchurch.com')
      .post('/api.php')
      .query(true)
      .basicAuth({
        user: 'myLogin',
        pass: 'myPassword'
      })
      .reply(200, fixture);
  });

  describe('#getParticipants', function () {
    it('gets the participants in a group', function (done) {
      let id = '17';
      let myGroup = new Group({id, connection});

      myGroup
        .getParticipants()
        .then((participants) => {
          expect(participants[0].name).to.eql('Princess Buttercup');
          expect(participants[1].name).to.eql('Wesley');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
