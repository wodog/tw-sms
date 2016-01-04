'use strict';

const request = require('request');
const querystring = require('querystring');
const debug = require('debug')('tw-sms');

let config;

/**
 * 构造函数
 * @param {Object} 必须的配置对象
 */
const sms = module.exports = function(apikey) {
  sms.apikey = apikey || process.env.SMS_KEY;

  return sms;
};


/**
 * 智能匹配模版发送短信
 * @param {String} mobile   接收的手机号;发送多个手机号请以逗号分隔，一次不要超过1000个
                            国际短信仅支持单号码发送，格式必须是"+"号开头，带有国际地区前缀号码的完整号码，否则将被认为是中国地区的号码
                            单号码：15205201314
                            多号码：15205201314,15205201315
                            国际短信：+93701234567
 * @param {String} text     短信内容
                            【云片网】您的验证码是1234
 */
sms.send = function(options, callback) {
  try {
    _validateSend(options);
  } catch (err) {
    callback(err);
  }

  sendRequest('https://sms.yunpian.com/v1/sms/send.json', options, callback);
};


/**
 * 查回复的短信
 * @param {String} start_time 短信回复开始时间  2013-08-11 00:00:00
 * @param {String} end_time 短信回复结束时间  2013-08-12 00:00:00
 * @param {Integer} page_num 页码，从1开始  1
 * @param {Integer} page_size 每页个数，最大100个  20
 * @param {String} mobile 填写时只查该手机号的回复，不填时查所有的回复  15205201314 (not required)
 */
sms.getReply = function(options, callback) {
  //todo validate

  sendRequest('https://sms.yunpian.com/v1/sms/get_reply.json', options, callback);
};

/**
 * 查短信发送记录
 * @param {String} phone 需要查询的手机号  15205201314
 * @param {String} start_time 短信发送开始时间  2013-08-11 00:00:00
 * @param {String} end_time 短信发送结束时间  2013-08-12 00:00:00
 * @param {Integer} page_num 页码，从1开始  1
 * @param {Integer} page_size 每页个数，最大100个  20
 */
sms.getRecord = function(options, callback) {
  //todo validate

  sendRequest('https://sms.yunpian.com/v1/sms/get_record.json', options, callback);
};

/**
 * send post request
 */
function sendRequest(url, options, callback) {
  _setApikey(options);

  request({
    url: url,
    method: 'POST',
    body: querystring.stringify(options),
    // json: true
  }, function(err, res, body) {
    if (err) {
      debug(err);
      return callback(err);
    }
    body = JSON.parse(body);
    debug(body);
    callback(null, body);
  });
}

/**
 * set apikey
 */
function _setApikey(options) {
  options.apikey = sms.apikey;
}

/**
 * 校验 send
 */
function _validateSend(options) {
  if (!options.mobile) {
    let error = new Error('mobile is required');
    debug(error);
    throw error;
  }

  if (!options.text) {
    let error = new Error('text is required');
    debug(error);
    throw error;
  }
}