'use strict';
const proxyquire = require('proxyquire');
const assert = require('assert');
const pmock = require('pmock');

afterEach(function () {
  if (this.platformMock) {
    this.platformMock.restore();
  }
});

describe('index', function () {
  describe('darwin', function () {
    before(function () {
      this.platformMock = pmock.platform('darwin');
    });

    it('should require darwin', function () {
      const uptime = proxyquire('./index', {
        './darwin': {
          type: 'darwin'
        },
        './linux': {
          type: 'linux'
        },
        './win32': {
          type: 'win32'
        }
      });

      assert.equal(uptime.type, 'darwin');
    });
  });

  describe('linux', function () {
    before(function () {
      this.platformMock = pmock.platform('linux');
    });

    it('should require linux', function () {
      const uptime = proxyquire('./index', {
        './darwin': {
          type: 'darwin'
        },
        './linux': {
          type: 'linux'
        },
        './win32': {
          type: 'win32'
        }
      });

      assert.equal(uptime.type, 'linux');
    });
  });

  describe('win32', function () {
    before(function () {
      this.platformMock = pmock.platform('win32');
    });

    it('should require win32', function () {
      const uptime = proxyquire('./index', {
        './darwin': {
          type: 'darwin'
        },
        './linux': {
          type: 'linux'
        },
        './win32': {
          type: 'win32'
        }
      });

      assert.equal(uptime.type, 'win32');
    });
  });

  describe('other', function () {
    before(function () {
      this.platformMock = pmock.platform('ChickenPlatform');
    });

    it('should throw if platform is not one of linux, darwin or win32', function () {
      assert.throws(() => {
        require('uptime');
      }, Error);
    });
  });
});
