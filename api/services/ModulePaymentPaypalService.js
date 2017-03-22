/* Copyright 2016 PayPal */
"use strict";
var paypal = require('paypal-rest-sdk');


module.exports = {


    paymentActionWithPaypal: function(req, res, mode, client_id, client_secret) {

        // we get the mode, client_id, and client_secret from collection

        paypal.configure({
            'mode': mode, //sandbox or live
            'client_id': client_id,
            'client_secret': client_secret
        });

        var create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://return.url",
                "cancel_url": "http://cancel.url"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "item",
                        "sku": "item",
                        "price": "0.03",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": "0.07",
                    "details": {
                        "subtotal": "0.03",
                        "tax": "0.01",
                        "shipping": "0.02",
                        "handling_fee": "0.01"
                    }
                },
                "description": "This is the payment description."
            }]
        };


        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                console.log("Create Payment Response");
                console.log('payment', payment.links[1].href);
                console.log(JSON.stringify(payment, null, 2));

                var redirectUrl = payment.links[1].href;

                res.redirect(redirectUrl); // redirect to paypal approval_url


            }
        });
    },



    paymentActionWithCreditCard: function(req, res, mode, client_id, client_secret){

        paypal.configure({
            'mode': mode, //sandbox or live
            'client_id': client_id,
            'client_secret': client_secret
        });


       /* 'mode': 'sandbox', //sandbox or live
            'client_id': '',
            'client_secret': ''
*/


        /*paypal.configure({
            'mode': 'live', // live
            'client_id': '',
            'client_secret': ''
        });*/



        console.log('[start]: paymentActionWithCreditCard');


        var create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "credit_card",
                "funding_instruments": [{
                    "credit_card": {
                        "type": "visa",
                        "number": "",
                        "expire_month": "",
                        "expire_year": "",
                        "cvv2":"" ,
                        "first_name": "",
                        "last_name": "",
                        "billing_address": {
                            "line1": "",
                            "city": "",
                            "state": "PI",
                            "postal_code": "56028",
                            "country_code": "IT"
                        }
                    }
                }]
            },
            "transactions": [{
                "amount": {
                    "total": "0.10",
                    "currency": "EUR",
                    "details": {
                        "subtotal": "0.10",
                        "tax": "0",
                        "shipping": "0"
                    }
                },
                "description": "This is the payment transaction description."
            }]
        };

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                console.log("Create Payment Response");
                console.log(payment);
            }

            return  'transaction done';


        });
    },


    paymentPaypalExecute: function(){


        // we retrieve from the redirect the value payerId and paymentId

        var mode = '';
        var client_id  = '';
        var client_secret = '';

        paypal.configure({
            'mode': mode,//'live', //sandbox or live
            'client_id': client_id,
            'client_secret': client_secret
        });



        var payerId = "";

        var execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "0.07"
                }
            }]
        };

        var paymentId = '';

        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log("Get Payment Response");
                console.log(JSON.stringify(payment));
            }
        });
    }


}