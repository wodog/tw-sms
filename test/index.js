'use strict';

const config = require('../config');
const tw_sms = require('../')(config.sms_opts.apikey);
const assert = require('assert');

describe('test/index.js', function() {
  describe('send', function() {
    it('should be ok ', function(done) {
      let options = {
        mobile: '18523975118',
        text: '您的验证码是5201314'
      };

      tw_sms.send(options, function(err, data) {
        assert.ok(data);
        assert.equal(data.code, 0);
        done();
      });

    });
  });

  describe('getReply', function() {
    it('should be ok', function(done) {
      let options = {
        start_time: '2015-12-25 00:00:00',
        end_time: '2015-12-30 00:00:00',
        page_num: 1,
        page_size: 100
      }

      tw_sms.getReply(options, function(err, data) {
        assert.ok(data);
        assert.equal(data.code, 0);
        done();
      });
    });
  });


  describe('getRecord', function() {
    it('should get record', function(done) {
      let options = {
        phone: '18523975118',
        start_time: '2015-12-28 00:00:00',
        end_time: '2015-12-30 00:00:00'
      }

      tw_sms.getRecord(options, function(err, data) {
        assert.ok(data);
        assert.equal(data.code, 0);
        done();
      })
    })
  })
});