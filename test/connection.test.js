import Connection from '../src/connection';

describe('Connection', () => {
  let ccb;
  const defaultOptions = {
    login: 'myLogin',
    password: 'myPassword',
    church: 'myChurch'
  };

  beforeEach(() => {
    ccb = nock('https://mychurch.ccbchurch.com')
      .post('/api.php')
      .basicAuth({
        user: 'myLogin',
        pass: 'myPassword'
      });
  });

  describe('#post', () => {
    it('returns a promise', () => {
      let connection = new Connection({});

      expect(connection.post()).to.respondTo('then');
    });

    context('successful response', () => {
      it('makes a request to the api endpoint for a church', () => {
        let expectedRequest = ccb.reply(function () {
          return [200, '<xml><sample>Test</sample></xml>'];
        });

        let connection = new Connection(defaultOptions);
        let request = connection.post();

        expectedRequest.done();
      });

      it('resolves xml as json', () => {
        let expectedRequest = ccb.reply(function () {
          return [200, '<ccb_api><response><groups><group>Hi</group></groups></response></ccb_api>'];
        });

        let connection = new Connection(defaultOptions);
        let request = connection.post();

        expectedRequest.done();
        return expect(request).to.eventually.eql({
          ccb_api: {
            response: {
              groups: {
                group: 'Hi'
              }
            }
          }
        });
      });
    });

    context('unsuccessful request', () => {
      it('rejects if credentials are not valid', () => {
        let expectedRequest = ccb.reply(function () {
          return [401, 'Not allowed'];
        });

        let connection = new Connection(defaultOptions);
        let request = connection.post();

        expectedRequest.done();
        return expect(request).to.be.rejectedWith('Error: Unauthorized');
      });

      it('rejects if there is an error parsing xml', () => {
        let expectedRequest = ccb.reply(function () {
          return [200, '<xml><broken>Test</xml>'];
        });

        let connection = new Connection(defaultOptions);
        let request = connection.post();

        expectedRequest.done();
        return expect(request).to.be.rejectedWith(/Error: Unexpected close tag/);
      });

      it('rejects if response has api errors', () => {
        let expectedRequest = ccb.reply(function () {
          return [200, '<ccb_api><response><errors><error>Bad</error></errors></response></ccb_api>'];
        });

        let connection = new Connection(defaultOptions);
        let request = connection.post();

        expectedRequest.done();
        return expect(request).to.be.rejectedWith('Bad');
      });
    });
  });
});
