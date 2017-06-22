// InsertDbService.js

//var nodemailer = require('nodemailer');
var host = sails.config.connections.mongodbServer.host;
var port = sails.config.connections.mongodbServer.port;
var database = sails.config.connections.mongodbServer.database;
//var urlConnection = "mongodb://localhost:27017/ymple-commerce"; // get the connexion.js database name
var url = "mongodb://" + host + ":" + port + '/' + database;
var ObjectId = require('mongodb').ObjectID;

// create reusable transporter object using SMTP transport
//var transporter = nodemailer.createTransport({
 //   service: 'Gmail',
 //   auth: sails.config.project.nodemailer.auth
//});


module.exports = {
    sendAlertEmail: function () {
        var mailOptions = {
            from: sails.config.project.nodemailer.sender, // sender address
            to: sails.config.project.nodemailer.mailToAlert, // send to self
            subject: 'New order created!', // Subject line
            html: '<p>You have new order.</p> Check your admin panel at <a href="' + sails.config.project.website + '/admin/' + '"></a> ' // html body
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) return console.log(err);
            else return console.log('Message sent: ' + info.response);
        });
    },


    getNewIdProduct: function () { // initialize the counter for name field, for example the productId

        var fieldName = 'product';
        return this.getNewId(fieldName);

    },

    getNewId: function (fieldName) { // return the new id product to use
        var MongoClient = require('mongodb').MongoClient;
        return new Promise(
            function (resolve, reject) {
                MongoClient.connect(url, function (err, db) {
                    var col = db.collection('counter');
                    var data = col.find({id: fieldName}).toArray(function (err, docs) {
                        db.close();
                        if (docs[0]) {

                            resolve(docs[0].seq);//docs[0].name.toString()); // returns to the function that calls the callback

                        }
                        else {
                            resolve(1);
                        }
                    });
                })
            })
    },

    getNewIdOrder: function () { // initialize the counter for name field, for example the productId

        var fieldName = 'order';
        return this.getNewId(fieldName);
    },

    getListCoreModule: function () {

        return new Promise(
            function (resolve, reject) {

                var MongoClient = require('mongodb').MongoClient;
                //var fieldName = 'product';

                MongoClient.connect(url, function (err, db) {
                    var collectionName = "core_module";
                    var col = db.collection(collectionName);
                    var data = col.find({}).toArray(function (err, data) {
                        db.close();
                        console.log('getListCoreModule - data', data);
                        resolve(data);//docs[0].name.toString()); // returns to the function that calls the callback
                    });
                })
            })
    },

    getCategoryList: function () { // return the category list

        return new Promise(
            function (resolve, reject) {

                var MongoClient = require('mongodb').MongoClient;

                MongoClient.connect(url, function (err, db) {
                    var collectionName = "category";
                    var col = db.collection(collectionName);
                    var data = col.find({}).toArray(function (err, data) {
                        db.close();
                        console.log('getListCoreModule - data', data);
                        resolve(data);//docs[0].name.toString()); // returns to the function that calls the callback
                    });
                })
            })
    },

    getCategoryItem: function (idCategory) { // return the category item

        return new Promise(
            function (resolve, reject) {

                var MongoClient = require('mongodb').MongoClient;

                MongoClient.connect(url, function (err, db) {
                    var collectionName = "category";
                    var col = db.collection(collectionName);
                    var data = col.find({_id: ObjectId(idCategory)}).toArray(function (err, data) {
                        db.close();
                        console.log('getCategoryItem', data);
                        resolve(data);//docs[0].name.toString()); // returns to the function that calls the callback
                    });
                })
            })
    },

    getListCoreModuleInstalled: function () {

        return new Promise(
            function (resolve, reject) {

                var MongoClient = require('mongodb').MongoClient;
                var fieldName = 'product';

                MongoClient.connect(url, function (err, db) {
                    var collectionName = "core_module_installed";
                    var col = db.collection(collectionName);
                    var data = col.find({}).toArray(function (err, data) {
                        db.close();
                        console.log('getListCoreModule - data', data);
                        resolve(data);//docs[0].name.toString()); // returns to the function that calls the callback
                    });
                })
            })
    },

    getStatusInstallation: function () {

        return new Promise(
            function (resolve, reject) {

                var MongoClient = require('mongodb').MongoClient;

                MongoClient.connect(url, function (err, db) {
                    var collectionName = "installation";
                    var col = db.collection(collectionName);
                    var data = col.find({}).toArray(function (err, data) {
                        db.close();
                        console.log('getStatusInstallation', data);
                        var output;

                        if (data.status == 'done') {
                            output = true;
                        }
                        else {
                            output = false;
                        }

                        resolve(data);//docs[0].name.toString()); // returns to the function that calls the callback
                    });
                })
            })
    },

    getItemPaymentFromOrder: function (idOrder) { // return the data and item information about one order

        var promise = new Promise(
            function (resolve, reject) {

                var collectionName = "order";

                console.log('getItemPaymentFromOrder - idOrder', idOrder);


                var MongoClient = require('mongodb').MongoClient;

                MongoClient.connect(url, function (err, db) {

                    var col = db.collection(collectionName);

                    col.find({idOrder: parseInt(idOrder)}).toArray(function (err, data) {
                        //db.close();
                        console.log('getItemPaymentFromOrder - data', data);

                        resolve(data);    //docs[0].name.toString()); // returns to the function that calls the callback
                    });
                })
            })

        return promise;
    },

    returnItemWithPriceForOrder: function (input) { // return the data and item information about one order

        var promise = new Promise(
            function (resolve, reject) {

                var collection = "product";

                console.log('getItemPaymentFromOrder - idOrder', input);


                var MongoClient = require('mongodb').MongoClient;

                MongoClient.connect(url, function (err, db) {

                    var col = db.collection(collection);

                    var idProduct = input[0].id;

                    var findQuery =  {_id: ObjectId(idProduct)};

                    col.find(
                       findQuery
                    ).toArray(function (err, data) {
                        //db.close();
                        console.log(err);

                        console.log('returnItemWithPriceForOrder - data', data);

                        resolve(data);    //docs[0].name.toString()); // returns to the function that calls the callback
                    })
                })
            })

        return promise;

    },

    getConfigurationModule: function (input) { // return the data and item information about one order

        var promise = new Promise(
            function (resolve, reject) {

                var collection = "core_module_installed";

               // console.log('getItemPaymentFromOrder - idOrder', input);


                var MongoClient = require('mongodb').MongoClient;

                MongoClient.connect(url, function (err, db) {

                    var col = db.collection(collection);

                    var findQuery =  {name: input};

                    col.find(
                        findQuery
                    ).toArray(function (err, data) {
                        //db.close();
                        console.log(err);

                        console.log('getConfigurationModule - data', data);

                        resolve(data);
                    })
                })
            })

        return promise;

    },



};
