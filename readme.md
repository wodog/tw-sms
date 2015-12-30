# tw-sms
 [![Version npm](https://img.shields.io/npm/v/tw-sms.svg)](https://www.npmjs.com/package/tw-sms)

  trend wood sms module.

## install

```bash
npm install tw-sms
```

## set up
  first, you should create `config.js`.

  and then, add some config in it, just like below:

```js
module.exports = {
  sms_opts: {
    apikey: 'your apikey'   // get key from www.yunpian.com
  }
};
```

## usage

```js
var config = require('config');
var tw_sms = require('tw-sms')(config.sms_opts.apikey);

// sms send
let options1 = {
  mobile: '18523975118',
  text: '您的验证码是5201314'
};
tw_sms.send(options1, callback);

// sms get reply
let options2 = {
  start_time: '2015-12-25 00:00:00',
  end_time: '2015-12-30 00:00:00',
  page_num: 1,
  page_size: 100
}
tw_sms.getReply(options2, callback);

// sms get record
let options3 = {
  start_time: '2015-12-25 00:00:00',
  end_time: '2015-12-30 00:00:00',
  page_num: 1,
  page_size: 100
}
tw_sms.getReply(options3, callback);
```

## documents

  [参数与返回值](https://www.yunpian.com/api/sms.html)

## test

```sh
npm install
npm test
```
