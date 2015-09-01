import {writeFileSync, readFileSync} from 'fs';
import {resolve} from 'path';

function getFixturePath (fixtureFile) {
  return resolve(`${__dirname}/../fixtures/${fixtureFile}`);
}

export function writeFixture(fixtureFile, data) {
  return writeFileSync(getFixturePath(fixtureFile), data);
}

export function readFixture(fixtureFile) {
  return readFileSync(getFixturePath(fixtureFile), {encoding: 'utf8'});
}

