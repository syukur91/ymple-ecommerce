/* Copyright 2016 PayPal */
"use strict";
var paypal = require('../../');


module.exports = {


    paymentActionWithPaypal: function() {
        paypal.configure({
            'mode': 'security-test-sandbox',
            'client_id': '<CLIENT_ID>',
            'client_secret': '<CLIENT_SECRET>'
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
                console.log(JSON.stringify(payment, null, 2));
            }
        });
    },



    paymentActionWithCreditCard: function(){



        /* Copyright 2015-2016 PayPal, Inc. */
        "use strict";

        var paypal = require('../../');
        require('../configure');

        var create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "credit_card",
                "funding_instruments": [{
                    "credit_card": {
                        "type": "visa",
                        "number": "4417119669820331",
                        "expire_month": "11",
                        "expire_year": "2018",
                        "cvv2": "874",
                        "first_name": "Joe",
                        "last_name": "Shopper",
                        "billing_address": {
                            "line1": "52 N Main ST",
                            "city": "Johnstown",
                            "state": "OH",
                            "postal_code": "43210",
                            "country_code": "US"
                        }
                    }
                }]
            },
            "transactions": [{
                "amount": {
                    "total": "7",
                    "currency": "USD",
                    "details": {
                        "subtotal": "5",
                        "tax": "1",
                        "shipping": "1"
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
        });
    }



}