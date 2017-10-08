/**
 * Api/paymentController
 *
 * @description :: Server-side logic for managing api/payments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var CoreReadDbService = require('../../../services/core/back/CoreReadDbService');
var CoreInsertDbService = require('../../../services/core/back/CoreInsertDbService');
var ModulePaymentPaypalService = require('../../../services/core/api/ModulePaymentPaypalService');
var pathTemplateBackCore =  sails.config.globals.templatePathFrontCore;

const async = require('promise-async')


module.exports = {

    paypalPay: function (req, res) {

        var idOrder = req.params.idPayment;
        console.log('[start]: payment controller');
        console.log('api - paymentController - id', req.params.idPayment);
        console.log('api - paymentController - req.session', req.session);

        // get all the information about this order



        async.waterfall([





            function (callback) {

                CoreReadDbService.getItemPaymentFromOrder(idOrder).then(function (dataOrder) {

                    var itemCart = dataOrder[0].cart;
                    callback(null, itemCart);
                });
            },

            function (arg1, callback) {

                console.log('arg1 - itemCart', arg1);

                CoreReadDbService.returnItemWithPriceForOrder(arg1).then(function (dataWithPriceOrder) {
                    console.log('paypalPay - dataWithPriceOrder', dataWithPriceOrder);

                    callback(null, arg1, dataWithPriceOrder)

                })
            },

            function (arg1, arg2, callback) {
                var dataOrder;

                console.log('arg1 at the end', arg1);
                console.log('arg2 at the end', arg2);
                console.log('paypalpay - getItemPaymentFromOrder');

                var currency = "EUR";
                var itemList = getItemListFromDataOrder(arg2, currency);
                var amount = getAmountFromDataOrder(arg2, currency);

                //process.exit();


                /*function (callback){


                    var modeDemo = getPaypalMode();

                    if (modeDemo == 'live') {
                        var mode = modeDemo;
                        var client_id = getClientIdPaypal();
                        var client_secret = getClientSecretPaypal();
                    }
                    else if (modeDemo == 'sandbox') {

                        var mode = modeDemo;
                        var client_id = getClientIdPaypal();
                        var client_secret = getClientSecretPaypal();
                    }
                    callback(null, mode);

                },*/


                var categoryModule = "payment";
                var nameModule = "paypal";

                 CoreReadDbService.getConfigurationOneModule(categoryModule, nameModule).then(function (data) {
                      console.log('getPaypalMode - data', data);

                //callback(null, arg1, dataWithPriceOrder)

                //     return output;


                     var modeDemo = data[0].mode;

                     if (modeDemo == 'live') {
                         var mode = modeDemo;
                         var client_id = data[0].client_id;
                         var client_secret = data[0].client_secret;
                     }
                     else if (modeDemo == 'sandbox') {

                         var mode = modeDemo;
                         var client_id = data[0].client_id;
                         var client_secret = data[0].client_secret;
                     }

                     ModulePaymentPaypalService.paymentActionWithPaypal(req, res, mode, client_id, client_secret, itemList, amount);

                     callback(null, 'done')


                 })






            }

        ]).then(function (value) {
            console.log(value === 'done') // => true

            console.log('end of call list ');

        })


        console.log('[end]: payment controller');
    },

    paypalExecuteSuccess: function (req, res) {

        var mode = 'sandbox';
        var client_id = 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM';
        var client_secret = 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM';

        ModulePaymentPaypalService.paymentPaypalExecute(req, res, mode, client_id, client_secret);
    },

    paypalExecuteCancel: function (req, res) {

        return res.ok('Payment Paypal Cancelled');
    },

    paypalExecuteConfirmationSuccess: function (req, res) {


        var result = {};

        result.templateToInclude = 'yes';
        result.pathToInclude = '../payment/paypal/success.ejs';

        return res.view(pathTemplateBackCore + 'payment/paypal/success.ejs', result);

        //return res.ok('Payment Paypal Confirmation done');

    },

    paypalExecuteConfirmationError: function (req, res) {

        return res.ok('Payment Paypal Confirmation error');
    },




}


function getClientIdPaypal (){

    var output = 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM';
    return output;


}

function getClientSecretPaypal (){

    var output = 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM';
    return output;
}

function getPaypalMode (){


    var arg1 = 1 ;
    var categoryModule = 'payment';
    var nameModule = 'paypal';
    var output = 'sandbox';

   // CoreReadDbService.getConfigurationOneModule(categoryModule, nameModule).then(function (data) {
  //      console.log('getPaypalMode - data', data);

        //callback(null, arg1, dataWithPriceOrder)

   //     return output;

   // })

    return output;



}


function getItemListFromDataOrder(input, currency) {

    var output = {
        "items": [

            {
                "name": input[0].name,
                "sku": "item12222",
                "price": input[0].price,
                "currency": currency,
                "quantity": 1
            }

            /*,
             {
             "name": "item2",
             "sku": "item2",
             "price": "0.00",
             "currency": "USD",
             "quantity": 1
             }*/
        ]
    };

    return output;


}

function getAmountFromDataOrder(input, currency) {

    var output = {
        "currency": currency,
        "total": input[0].price,
        "details": {
            "subtotal": input[0].price,
            "tax": "0.00",
            "shipping": "0.00",
            "handling_fee": "0.00"
        }
    };

    return output;
}



