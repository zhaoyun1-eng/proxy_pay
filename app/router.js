'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/', controller.payment.indexPage);
  router.get('/createOrder', controller.payment.createOrder);
  router.post('/orderCallBack', controller.payment.orderCallBack);
};
