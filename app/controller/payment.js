'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');
const payServerUrl = 'http://192.168.1.17:9999/api/generateOrder';
const key = '2cfdc6472022023421f60c63481f0f904c81b0854c4dfc31924b051ace679de6';


class PaymentController extends Controller {

  async indexPage() {
    const {
      ctx
    } = this;
    ctx.logger.info('some request data: ==================访问welcome=====================');
    ctx.body = 'egg ok';
  }

  async createOrder() {
    const {
      ctx
    } = this;
    ctx.logger.info('==================订单request=======================');
    let queryParams = ctx.request.query;
    let hotelName = queryParams.hotelName;
    let amount = queryParams.amount;
    let orderId = queryParams.orderId;
    let payType = queryParams.payType;
    let params = {
      memberId: '1000002',
      token: '877466ffd21fe26dd1b3366330b7b560',
      finishUrl: 'http://www.baidu.com',
      notifyUrl: 'https://traveltutu.com/paymentor/orderCallBack',
    };
    ctx.logger.info('创建订单id:' + orderId);
    params.payType = payType; //alipay wechat
    params.desc = hotelName;
    params.amount = amount;
    params.memberOrderCode = orderId;
    let sign = this.jsonSort(params);
    params.paySign = crypto.createHash('md5')
      .update((sign += ('&key=' + key)))
      .digest('hex')
      .toUpperCase();
    const result = await ctx.curl(payServerUrl, {
      method: 'POST',
      contentType: 'json',
      data: params,
      dataType: 'json',
    });
    ctx.logger.info('==================订单 response=======================');
    ctx.body = result;
  }

  jsonSort(jsonObj) {
    let arr = [];
    for (var key in jsonObj) {
      arr.push(key);
    }
    arr.sort();
    let str = '';
    for (var i in arr) {
      str += arr[i] + '=' + jsonObj[arr[i]] + '&';
    }
    return str.substr(0, str.length - 1);
  }

  async orderCallBack() {
    const {
      ctx
    } = this;
    console.log('===================回调来了===================');
    console.log('===================回调来了===================');
    console.log('===================回调来了===================');
    ctx.body = 'ok';
  }
}

module.exports = PaymentController;
