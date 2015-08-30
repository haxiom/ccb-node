export default class {
  constructor (options) {
    this._connection = options.connection;
  }

  // https://designccb.s3.amazonaws.com/helpdesk/files/official_docs/api.html#groupprofiles
  all (options = {}) {
    let query = Object.assign({}, options.query, {
      srv: 'group_profiles'
    });

    return this._connection.post(query)
    .then(function (response) {
      return response.ccb_api.response.groups.group;
    });
  }
}
