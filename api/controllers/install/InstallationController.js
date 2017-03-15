/**
 * InstallationController
 *
 * @description :: Server-side logic for managing installations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  firstInstallation: function (req, res){ // first command execute , need to be checked if already used

    console.log('[START]: firstInstallation');

    CoreInsertDbService.createUserAdminDefault();
    CoreInsertDbService.installCounter('order'); // create the collection order
    CoreInsertDbService.installCounter('product'); // create the collection product
    CoreInsertDbService.firstInstallCoreModule('paypal');
    CoreInsertDbService.firstInstallCoreModule('stripe');

    console.log('[END]: firstInstallation');

    return res.json({
      status: 'installation Database done + creation default admin user ( admin / admin), you can go to /admin'
    });

  },
  
  /**
   * `InstallationController.initDatabaseCounter()`
   */
  initCounterProduct: function (req, res) {
    var counterType = 'product';
    CoreInsertDbService.initCounterProduct(counterType);
    return res.json({
      todo: 'initDatabaseCounter() done'
    });
  },

  initCounterOrder: function (req, res){ //
    var counterType = 'order';
    CoreInsertDbService.initCounterOrder(counterType);

    return res.json({
      todo: 'initDatabaseCounter() done'
    });
  }
};

