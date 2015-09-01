import superagent from 'superagent';
import {parseString} from 'xml2js';

export default class {
  constructor (options) {
    this._login = options.login;
    this._password = options.password;
    this._church = options.church;

    this._endpoint = `https://${this._church}.ccbchurch.com/api.php`.toLowerCase();
  }

  _verifyResponse (response) {
    let responseObj = response.ccb_api.response;
    if (responseObj && responseObj.errors) {
      return responseObj.errors.error
    }
    return false;
  }

  _parseXml(xml, callback) {
    parseString(xml, {
      explicitArray: false,
      trim: true
    },  callback);
  }

  post (queryParams) {
    return new Promise((resolve, reject) => {
      superagent
        .post(this._endpoint)
        .auth(this._login, this._password)
        .query(queryParams)
        .end((err, response) => {
          if (err) { return reject(err); }
          this._parseXml(response.text, (err, body) => {
            if (err) { return reject(err); }
            let apiErrors = this._verifyResponse(body);

            if (apiErrors) { return reject(apiErrors); }

            resolve(body);
          });
        });
    });
  }
}
