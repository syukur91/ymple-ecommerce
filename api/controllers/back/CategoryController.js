/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


    /**
     * `CategoryController.list()`
     */
   /* list: function (req, res) {

        var result = {
            admin: req.session.user
        };

        result.products = [];
        result.pages = [];
        result.page = '';

        result.templateToInclude = 'categoryList';

        return res.view('back/menu.ejs', result);
    },*/


    list: function (req, res) {
        var result = {
            admin: req.session.user
        };
        var skip = 0;
        var page = 1;

        if (req.query.hasOwnProperty('page')) {
            skip = (req.query.page - 1) * 10;
            page = req.query.page;
        }

        var queryOptions = {
            where: {},
            skip: skip,
            limit: 10,
            sort: 'createdAt DESC'
        };

        result.page = page;

        async.waterfall([
            function GetTotalCount(next) {
                Category.count(function (err, num) {
                    if (err) return next(err);

                    result.pages = [];

                    for (var i = 0, count = parseInt(num / queryOptions.limit); i <= count; i++) {
                        result.pages.push(i + 1);
                    }

                    return next(null);
                });
            },

            function GetProducts(next) {
                Category.find(queryOptions, function (err, products) {
                    if (err) next(err);

                    result.products = products;

                    return next(null);
                });
            },

            function GetEditProduct(next) {
                if (!req.params.hasOwnProperty('id')) {
                    return next(null);
                    return;
                }

                Category.findOne(req.params.id, function (err, product) {
                    if (err) next(err);
                    result.edit = product;

                    return next(null);
                });
            }
        ], function (err) {
            if (err) return res.serverError(err);
            result.templateToInclude = 'categoryList';
            return res.view('back/commun-back/main.ejs', result);
        });
    },


    /**
     * `CategoryController.create()`
     */
    create: function (req, res) {

        var result = {};

        result.templateToInclude = 'category_create';

        return res.view('back/commun-back/main.ejs', result);

    },


    edit: function (req, res) { // edit one category

        var result = {};

        result.templateToInclude = 'category_edit';

        return res.view('back/commun-back/main.ejs', result);

    },


    delete: function (req, res, id) {  // display the delete page for validation

        var result = {};

        //console.info('modification product id: ', req.params.id);
        //console.info(req.params.id.length);

        if (req.params.id && (req.params.id.length > 0 )) {
            // we retrieve the product informations
            var productId = req.params.id;


            result.templateToInclude = 'category_delete';
            result.idProduct = productId;

            return res.view('back/commun-back/main.ejs', result);
        }
    },


    deleteConfirmation: function (req, res, id) {

        var result = {};
        console.info('modification product id: ', req.params.id);
        console.info(req.params.id.length);

        if (req.params.id && (req.params.id.length > 0 )) {
            // we retrieve the product informations
            var productId = req.params.id;


            CoreDeleteDbService.deleteProduct(productId);

            result.templateToInclude = 'category_delete_ok';
            return res.view('back/commun-back/main.ejs', result);



        }
        else {
            result.templateToInclude = 'category_list';
            return res.view('back/commun-back/main.ejs', result);
        }
    },



    /**
     * `CategoryController.update()`
     */
    update: function (req, res) {
        return res.json({
            todo: 'update() is not implemented yet!'
        });
    },

    createValidation: function (req, res) {

        console.info('req');
        console.info(req.body);

        if (req && req.body && req.body.name) {
            var data = {};
            data = req.body;

            console.log('CategoryController - createValidation', data);

            CoreInsertDbService.insertCategory(data);
            CoreInsertDbService.incrementId('category');

            var result = {};
            result.templateToInclude = 'categoryCreationOk';
            return res.view('back/commun-back/main.ejs', result);
            //return res.ok('create of the product done', req.body);


        }
        else {
            var result = {};
            result.templateToInclude = 'categoryCreationKo';
            return res.view('back/commun-back/main.ejs', result);
            //return res.ok('missing one parameter');
        }
    }

};

