/**
 * Api/paymentController
 *
 * @description :: Server-side logic for managing api/payments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var CoreReadDbService = require('../../../services/core/back/CoreReadDbService');
var CoreInsertDbService = require('../../../services/core/back/CoreInsertDbService');
var ModulePaymentPaypalService = require('../../../services/core/api/ModulePaymentPaypalService');


const async = require('promise-async')


module.exports = {


    paypalPay: function (req, res) {

        var idOrder = req.params.idPayment;
        console.log('[start]: payment controller');
        console.log('api - paymentController - id', req.params.idPayment);
        console.log('api - paymentController - req.session', req.session);

        // get all the information about this order

        var modeDemo = true;

        if (modeDemo) {
            var mode = 'sandbox';
            var client_id = 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM';
            var client_secret = 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM';
        }
        else {

            var mode = 'live';
            var client_id = 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM';
            var client_secret = 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM';
        }


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
                var itemList = getItemListFromDataOrder(arg2);
                var amount = getAmountFromDataOrder(arg2);

                //process.exit();

                ModulePaymentPaypalService.paymentActionWithPaypal(req, res, mode, client_id, client_secret, itemList, amount);

                callback(null, 'done')
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

        return res.ok('Payment Paypal Confirmation done');
    },

    paypalExecuteConfirmationError: function (req, res) {

        return res.ok('Payment Paypal Confirmation error');
    }
}


function getItemListFromDataOrder(input) {

    var output = {
        "items": [{
            "name":input[0].name,
            "sku": "item12222",
            "price": input[0].price,
            "currency": "USD",
            "quantity": 1
        },


            {
                "name": "item2",
                "sku": "item2",
                "price": "0.00",
                "currency": "USD",
                "quantity": 1
            }
        ]
    };

    return output;


}

function getAmountFromDataOrder(input) {

    var output = {
        "currency": "USD",
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









