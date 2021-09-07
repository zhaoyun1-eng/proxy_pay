'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/index', controller.payment.indexPage);
  router.get('/createOrder', controller.payment.createOrder);
  router.get('/orderCallBack', controller.payment.orderCallBack);
};
