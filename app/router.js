'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/api/', controller.payment.indexPage);
  router.get('/api/createOrder', controller.payment.createOrder);
  router.post('/api/orderCallBack', controller.payment.orderCallBack);
};
