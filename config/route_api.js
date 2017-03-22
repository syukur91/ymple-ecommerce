module.exports.routes = {

    'POST    /product/save_image/:idProduct': 'api/UploadController.saveImageProduct',

    '/payment/paypal/pay': 'api/paymentController.paypalPay',

    '/payment/paypal/execute': 'api/paymentController.paypalExecute'



};




