import {readFixture} from './support/fixture-helper';
import Connection from '../src/connection';
import Groups from '../src/groups';

describe('groups', () => {
  let ccb;
  let fixture = readFixture('groups-response.xml');
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

  describe('#all', () => {
    it('retrieves all groups for a church', (done) => {
      let myGroups = new Groups({connection});

      return myGroups
        .all()
        .then((groups) => {
          expect(groups.length).to.eql(3);
          expect(groups[0].name).to.eql('Sound Team');
          done();
        })
        .catch(done)
    });
  });
});
