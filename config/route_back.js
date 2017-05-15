module.exports.routes = {

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
     * etc. depending on your default view engine) your home page.              *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/


    /***************************************************************************
     *                                                                          *
     * Custom routes here...                                                    *
     *                                                                          *
     *  If a request to a URL doesn't match any of the custom routes above, it  *
     * is matched against Sails route blueprints. See `config/blueprints.js`    *
     * for configuration options and examples.                                  *
     *                                                                          *
     ***************************************************************************/

    // ADMIN
    // old with menu toogle 'GET    /admin'               : 'back/AdminController.index',

    'GET    /admin': 'back/AdminController.menu',
    'GET    /admin/menu': 'back/AdminController.menu',

    // create the new product in db 
    '/admin/product/create/validation': 'back/productController.productNewValidation',
    'GET    /admin/product/create': 'back/productController.create',
    'GET    /admin/product/list': 'back/productController.list',// display all the product available
    'GET    /admin/product/edit/:id': 'back/productController.edit',// edit the product
    'GET    /admin/product/delete/:id': 'back/productController.delete',
    'GET    /admin/product/delete/confirmation/:id': 'back/productController.deleteConfirmation',

    // url to use the profile of the admin user
    'GET    /admin/administrator/edit/': 'back/userController.profile',

    //'admin/AdminController.productCreate',

    'GET    /admin/category/list': 'back/CategoryController.list',
    'GET    /admin/category/create': 'back/CategoryController.create',
    '/admin/category/edit/:id': 'back/CategoryController.edit',
    '/admin/category/delete/:id': 'back/CategoryController.delete',
    '/admin/category/delete/confirmation/:id': 'back/CategoryController.deleteConfirmation',


    'POST    /admin/category/create/validation': 'back/CategoryController.createValidation',

    'GET    /admin/order/manage': 'back/OrderController.manage',
    'GET    /admin/customer/list': 'back/AdminController.user',

    // page of admin preference
    'GET    /admin/preference': {view: 'back/preference'},


    // install page
    'GET    /admin/install': {view: 'install/index'},
    '/install': 'install/InstallationController.firstInstallation',

    '/admin/install/database': 'install/InstallationController.firstInstallation',


    // page to manage the modules
    'GET    /admin/module': {view: 'back/module/index'},
    'GET    /admin/module/create': 'back/moduleController.create',
    'GET    /admin/module/list/': 'back/moduleController.list',
    'GET    /admin/module/search': 'back/moduleController.search', // return the list of module to be added
    '/admin/module/install/': 'back/moduleController.install', // edit a module
    '/admin/module/edit/:nameModule': 'back/moduleController.edit', // edit a module
    '/admin/module/:nameModule/edit/validation': 'back/moduleController.editValidation', // validate the edit of one module, update the configuration

    '/admin/module/inactivate/:nameModule': 'back/moduleController.inactivate', // inactivate a module

    '/admin/module/paypal/': 'back/moduleController.paypal',

    '/admin/product/preview/:id': 'back/productController.preview'



};
