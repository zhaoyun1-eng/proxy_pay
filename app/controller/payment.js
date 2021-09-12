'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');
const payServerUrl = 'https://pay.lkshares.com/api/generateOrder';
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
    let queryParams = ctx.request.query;
    let hotelName = queryParams.hotelName;
    let amount = queryParams.amount;
    let orderId = queryParams.orderId;
    let payType = queryParams.payType;
    ctx.logger.info('创建订单=========>订单id:' + orderId);
    let params = {
      memberId: '1000002',
      token: '877466ffd21fe26dd1b3366330b7b560',
      // finishUrl: 'hottutu://order',
      finishUrl: 'http://m.traveltutu.com/',
      notifyUrl: 'http://pay.traveltutu.com/api/orderCallBack',
    };
    params.payType = payType; //alipay wechat
    params.desc = hotelName;
    params.amount = amount;
    params.memberOrderCode = orderId;
    let sign = this.jsonSort(params);
    params.paySign = crypto.createHash('md5')
      .update((sign += ('&key=' + key)))
      .digest('hex')
      .toUpperCase();
    params.transferBankPage = '101';
    const result = await ctx.curl(payServerUrl, {
      method: 'POST',
      contentType: 'json',
      data: params,
      dataType: 'json',
    });
    ctx.logger.info('订单' + orderId + '创建成功============> success');
    ctx.body = result;
    ctx.status = 200;
  }

  jsonSort(jsonObj) {
    let arr = [];
    for (let key in jsonObj) {
      arr.push(key);
    }
    arr.sort();
    let str = '';
    for (let i in arr) {
      str += arr[i] + '=' + jsonObj[arr[i]] + '&';
    }
    return str.substr(0, str.length - 1);
  }

  async orderCallBack() {
    const {
      ctx
    } = this;
    let orderId = ctx.request.body.memberOrderCode;
    if (orderId == null) {
      ctx.logger.error('!!!!!订单id为空!!!!!!');
      ctx.body = '订单id为空';
      return;
    }
    ctx.logger.info('===============订单：' + orderId + '接收回调=================');
    ctx.logger.warn('订单回调状态：' + ctx.request.body.status);
    if (Number(ctx.request.body.status.toString()) === 2) {
      let url = 'https://traveltutu.com/wp-json/wc/v3/orders/' + orderId + '?consumer_key=ck_093054f5c9e987451437861c92f935cced4d27ac&consumer_secret=cs_4b3251dd1eead374704e0d3c2e046170e9d929c1';
      const result = await ctx.curl(url, {
        method: 'POST',
        contentType: 'json',
        data: {
          'status': 'processing'
        },
        timeout: 10000,
        dataType: 'json',
      });
      ctx.logger.info('订单：' + orderId + '处理成功');
      ctx.body = 'SUCCESS';
    } else {
      ctx.body = '订单状态错误';
      ctx.logger.error('订单' + orderId + '回调失败 Status 状态不匹配');
    }
  }
}

module.exports = PaymentController;
