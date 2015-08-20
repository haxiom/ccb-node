import ccb from '../src/index';

describe('ccb', function () {
  it('exports an object', function () {
    expect(ccb).to.have.property('superagent');
  });
});
