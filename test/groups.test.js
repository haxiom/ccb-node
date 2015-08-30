import {readFixture} from './support/fixture-helper';
import Connection from '../src/connection';
import Groups from '../src/groups';

describe('Groups', () => {
  let groups, groupsWithoutParticipants;
  let fixture = readFixture('groups-response.xml');
  let withoutParticipantsFixture = readFixture('groups-response-without-participants.xml');
  let connection = new Connection({
    login: 'myLogin',
    password: 'myPassword',
    church: 'myChurch'
  });

  beforeEach(() => {
    groupsWithoutParticipants = nock('https://mychurch.ccbchurch.com')
      .post('/api.php')
      .query({
        srv: 'group_profiles',
        include_participants: false
      })
      .basicAuth({
        user: 'myLogin',
        pass: 'myPassword'
      })
      .reply(200, withoutParticipantsFixture);
    groups = nock('https://mychurch.ccbchurch.com')
      .post('/api.php')
      .query({srv: 'group_profiles'})
      .basicAuth({
        user: 'myLogin',
        pass: 'myPassword'
      })
      .reply(200, fixture);
  });

  describe('#all', () => {
    it('retreives groups without participant details', function (done) {
      let myGroups = new Groups({connection});

      myGroups
        .all({query: {include_participants: false}})
        .then((groups) => {
          expect(groups[0]).to.have.property('main_leader');
          expect(groups[0]).to.not.have.property('participants');
          done();
        }).catch(done);

    });

    it('retrieves all groups for a church', (done) => {
      let myGroups = new Groups({connection});

      myGroups
        .all()
        .then((groups) => {
          expect(groups.length).to.eql(3);
          expect(groups[0].name).to.eql('Sound Team');
          expect(groups[0]).to.have.property('participants');
          done();
        })
        .catch(done)
    });
  });
});
