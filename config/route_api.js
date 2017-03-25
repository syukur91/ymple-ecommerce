module.exports.routes = {

    'POST    /product/save_image/:idProduct': 'api/UploadController.saveImageProduct',

    '/payment/paypal/pay/:idPayment': 'api/paymentController.paypalPay',

    '/payment/paypal/execute/success/:idPayment': 'api/paymentController.paypalExecuteSuccess',

    '/payment/paypal/execute/cancel/:idPayment': 'api/paymentController.paypalExecuteCancel'


};




