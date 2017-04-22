/**
 * SubscriptionController
 *
 * @description :: Server-side logic for managing Subscriptions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    newsletter: function (req, res) {


        console.log('[start]- newsletter');

        var result = {
            result: 'success',
            product: 'test'
        };

        return res.json(result);


    }
};
