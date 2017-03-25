/**
 * Api/paymentController
 *
 * @description :: Server-side logic for managing api/payments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


    paypalPay: function (req, res) {

        console.log('[start]: payment controller');

        var mode = 'sandbox';
        var client_id = 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM';
        var client_secret = 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM';


        console.log('paymentController - req', req);

        //process.exit();

        ModulePaymentPaypalService.paymentActionWithPaypal(req, res, mode, client_id, client_secret);


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

    }
}
