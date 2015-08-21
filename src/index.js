import Group from './group';
import Connection from './connection';

export default class {
  constructor (options = {}) {
    if (!(options.login && options.password)) {
      throw new Error('must include login, password and church');
    }

    this._connection = new Connection ({
      login: options.login,
      password: options.password,
      church: options.church
    });
  }

  group (options) {
    if ( options.id ) {
      return new Group({
        connection: this._connection,
        id: options.id
      });
    }
  }
};
