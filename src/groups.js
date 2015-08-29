export default class {
  constructor (options) {
    this._connection = options.connection;
  }

  // https://designccb.s3.amazonaws.com/helpdesk/files/official_docs/api.html#groupprofiles
  all () {
    return this._connection.post({
      srv: 'group_profiles'
    })
    .then(function (response) {
      return response.ccb_api.response.groups.group;
    });
  }
}
