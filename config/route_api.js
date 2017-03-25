module.exports.routes = {

    'POST    /product/save_image/:idProduct': 'api/UploadController.saveImageProduct',

    '/payment/paypal/pay/:idPayment': 'api/paymentController.paypalPay',

    '/payment/paypal/execute/success/:idPayment': 'api/paymentController.paypalExecuteSuccess',

    '/payment/paypal/execute/cancel/:idPayment': 'api/paymentController.paypalExecuteCancel',

    '/payment/paypal/execute/confirmation/success/:idPayment': 'api/paymentController.paypalExecuteConfirmationSuccess', // double confirmation paypal step

    '/payment/paypal/execute/confirmation/error/:idPayment': 'api/paymentController.paypalExecuteConfirmationError' // double confirmation paypal step


};




