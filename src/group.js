export default class {
  constructor (options) {
    this._connection = options.connection;
    this._id = options.id;
  }

  getParticipants () {
    return this._connection.post({
      srv: 'group_participants',
      id: this._id
    }).then((response) => {
      return response.ccb_api.response[0].groups[0].group[0].participants[0].participant
    });
  }
}
