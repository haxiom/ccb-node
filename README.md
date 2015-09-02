ccb-node
---

![Build Status](https://travis-ci.org/haxiom/ccb-node.svg?branch=master) ![npm version](https://badge.fury.io/js/ccb.svg)

A lightweight wrapper for the Church Community Builder API

# Releasing

Use [mversion](https://www.npmjs.com/package/mversion) to easily release a new version.

```shell
npm i -g mversion

# mversion [ major | minor | patch ]
mversion minor
```

This will:

- run the tests
- update `package.json`
- add a commit and git tag
- push the current branch
- push git tags
- release on NPM
