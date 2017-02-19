// InsertDbService.js

var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: sails.config.project.nodemailer.auth
});

var urlConnection = "mongodb://localhost:27017/ymple-commerce";


getValueFromArray = function (data, element, type) {


    //return 10;

    var output = '';

    // console.log('enter function getValueArray');

    // console.log('data.element',data.[element] );
    if (data && data[element]) {

        if (type == 'int') {

            //  output = parseInt(data[element])
        }
        else {
            output = data[element];
        }


    }

    return output;


},

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

        test: function () {

            return 'test ok service';
        },


        incrementId: function (fieldName) { // increment the idProduct in the table counter

            console.log('InsertDbService - incrementId', fieldName);

            var MongoClient = require('mongodb').MongoClient;

            //var url = "mongodb://localhost:27017/ymple-commerce";

            MongoClient.connect(urlConnection).then(function (db) {

                //console.log('InsertDbService - incrementId - error');

                var collectionCounter1 = db.collection('counter');

                collectionCounter1.update(
                    {_id: fieldName},
                    {$inc: {seq: 1}}
                )
            });
        },


        insertProduct: function (data) { // Insert a product in table product

            var MongoClient = require('mongodb').MongoClient;
            console.log('InsertDbService - url connexion ', urlConnection);

            //Connect to the db
            MongoClient.connect(urlConnection).then(function (db) {

                console.log('data.name', data.name);

                var date = new Date();

                var createdAt = date.toISOString();

                var updatedAt = date.toISOString();

                console.log('date', date);

                var idProduct = parseInt(data.idProduct);
                var price = parseInt(data.price);
                var stock = data.stock;
                var video = data.video;
                var description = data.description;
                var name = data.name;


                var dataToInsert = {
                    name: name,
                    idProduct: idProduct,
                    price: price,
                    stock: stock,
                    video: video,
                    description: description,
                    createdAt: createdAt,
                    updatedAt: updatedAt
                }

                console.log('insert test2');

                var collection = db.collection('product');
                //var lotsOfDocs = [{'hello': 'doc3'}, {'hello': 'doc4'}];

                collection.insert(dataToInsert);

            });
        },


        insertOrder: function (data) { // Insert an order

            var MongoClient = require('mongodb').MongoClient;

            //Connect to the db
            MongoClient.connect(urlConnection).then(function (db) {

                //console.log('data.name', data);

                var date = new Date();
                var createdAt = date.toISOString();
                var updatedAt = date.toISOString();

                console.log('insertOrder - date2', date);
                console.log('insertOrder - test', data['idOrder']);

                var idOrder = getValueFromArray(data, 'idOrder', '');
                // console.log('idOrder', idOrder);
                var name = getValueFromArray(data, 'name', '');
                // console.log('FTH1');
                var email = getValueFromArray(data, 'email', '');
                var phone = getValueFromArray(data, 'phone', '');
                var address = getValueFromArray(data, 'address', '');
                // console.log('adress');
                var postcode = getValueFromArray(data, 'postcode', 'int');
                var comment = getValueFromArray(data, 'comment', '');
                var payment = getValueFromArray(data, 'payment', '');
                var shipping = getValueFromArray(data, 'shipping', '');
                var price = getValueFromArray(data, 'price', 'int');
                var list_product = getValueFromArray(data, 'list_product', '');
                var cart = getValueFromArray(data, 'cart', '');

//            console.log('insertOrder - cart', cart);

                var dataToInsert = {
                    idOrder: idOrder,
                    name: name,
                    email: email,
                    phone: phone,
                    address: address,
                    postcode: postcode,
                    comment: comment,
                    payment: payment,
                    shipping: shipping,
                    price: price,
                    list_product: list_product,
                    cart: cart,
                    createdAt: createdAt,
                    updatedAt: updatedAt
                }

                //  console.log('insertOrder - dataToInsert', dataToInsert);

                var collection = db.collection('order');
                collection.insert(dataToInsert, function (error, result) {
                    if (error) console.log(error); //info about what went wrong
                    if (result) {


                        console.log('[START]: increment id order');

                        var fieldName = 'order';
                        var collectionCounter1 = db.collection('counter');

                        //collectionCounter1.insert({toto: "toto"});

                        collectionCounter1.update(
                            {_id: fieldName},
                            {$inc: {seq: 1}}, function (error, result) {
                                if (error) console.log(error);
                                if (result) {
                                    console.log(result);
                                }
                            }//info about what went wrong
                        )
                        console.log('[END]: increment id order');

                        //                  console.log ( result ); //the _id of new object if successful
//

                    }
                });
                console.log('insertOrder - [DONE]');


            });
        },


        installCounter: function (counterType) { // Insert an order

            var MongoClient = require('mongodb').MongoClient;

            //Connect to the db
            MongoClient.connect(urlConnection).then(function (db) {

                var date = new Date();
                var createdAt = date.toISOString();
                var updatedAt = date.toISOString();

                var collection = db.collection('counter');
                var data = {_id: counterType, id: counterType, seq: 1};
                collection.insert(data, function (error, result) {
                    if (error) console.log(error);
                    if (result) {
                        console.log(result);
                    }
                })//info about what went wrong);

            });
        },


        insertCategory: function (data) { // Insert a category in table category

            var MongoClient = require('mongodb').MongoClient;
            console.log('InsertDbService - url connexion ', urlConnection);

            //Connect to the db
            MongoClient.connect(urlConnection).then(function (db) {

                var date = new Date();
                var createdAt = date.toISOString();
                var updatedAt = date.toISOString();

                var idCategory = parseInt(data.idCategory);
                var name = data.name;
                var description = data.description;
                var tag = data.tag;

                var dataToInsert = {
                    name: name,
                    idCategory: idCategory,
                    //price: price,
                    //stock: stock,
                    //video: video,
                    description: description,
                    createdAt: createdAt,
                    updatedAt: updatedAt
                }
                console.log('InsertDbService - insertCategory - dataToInsert', dataToInsert);
                var collection = db.collection('category');
                //var lotsOfDocs = [{'hello': 'doc3'}, {'hello': 'doc4'}];
                collection.insert(dataToInsert);

            });
        },


        saveImageProduct: function (idProduct, imagePath) { // Insert a product in table product

            console.log('InsertDbService - saveImageProduct - imagePath ', imagePath);

            MongoClient = this.getConnexion();
            //Connect to the db
            MongoClient.connect(urlConnection).then(function (db) {

                //console.log('data.name' , data.name);

                var date = new Date();

                var createdAt = date.toISOString();

                var updatedAt = date.toISOString();

                var collection = db.collection('product');
                //var lotsOfDocs = [{'hello': 'doc3'}, {'hello': 'doc4'}];

                //collection.insert(dataToInsert);

                console.log('saveImageProduct - update');

                collection.update(
                    {idProduct: parseInt(idProduct)},
                    // {price: '999999999999999'}

                    {$set: {image: [imagePath]}},
                    {upsert: true})


                //      { $set: { reorder: false, tags: [ "literature", "translated" ] } })
            });
        },

        installAndActiveCoreModule: function (nameModule) { // active a module

            MongoClient = this.getConnexion();

            MongoClient.connect(urlConnection).then(function (db) {//Connect to the db


                var usernameApi = '';
                var passwordApi = '';
                var firmaApi = '';

                var date = new Date();
                var createdAt = date.toISOString();
                var updatedAt = date.toISOString();

                var idModule = 0;
                var name = nameModule;
                var description = nameModule;
                var category = 'category';
                var configuration = {usernameApi: usernameApi, passwordApi: passwordApi, firmaApi: firmaApi};

                var data = {
                    name: name,
                    idModule: idModule,
                    category: category,
                    configuration: configuration,
                    description: description,
                    createdAt: createdAt,
                    updatedAt: updatedAt,
                    isActive: 1
                }
                console.log('InsertDbService - installAndActiveCoreModule - data', data);
                var collection = db.collection('core_module_installed');
                collection.insert(data);

            });
        },

        getConnexion: function () {

            var MongoClient = require('mongodb').MongoClient;
            console.log('InsertDbService - url connexion ', urlConnection);

            return MongoClient;


        },

        otherMethod: function () {

            var mongodb = require('mongodb');
            var MongoClient = mongodb.MongoClient;
            var Collection = mongodb.Collection;

            // Promise.promisifyAll(Collection.prototype);
            //Promise.promisifyAll(MongoClient);


            //Connect to the db
            MongoClient.connect(urlConnection).then(function (err, db) {

                if (err) {
                    return console.dir(err);
                }

                var collection = db.collection('test');
                var doc1 = {'hello': 'doc1'};
                var doc2 = {'hello': 'doc2'};
                var lotsOfDocs = [{'hello': 'doc3'}, {'hello': 'doc4'}];

                collection.insert(doc1);

                collection.insert(doc2, {w: 1}, function (err, result) {
                });

                collection.insert(lotsOfDocs, {w: 1}, function (err, result) {
                });

                var collectionCounter = db.collection('counter');

                var counter = {
                    _id: fieldName,
                    id: fieldName,
                    seq: 0
                };

                collectionCounter.insert(counter);

                //var ret = collectionCounter.find();
                //var ret2 = collectionCounter.find({_id: fieldName});

                /*.toArray(function(err, docs) {
                 //assert.equal(err, null);
                 //assert.equal(2, docs.length);
                 console.log("Found the following records");
                 console.dir(docs);
                 //callback(docs);
                 });
                 */
                //console.log ('ret2', ret2);

                // get new sequence

                collectionCounter.update(
                    {_id: fieldName},
                    {$inc: {seq: 1}}
                )
                collectionCounter.find({_id: fieldName}).toArray(function (err, docs) {
                    //assert.equal(err, null);
                    //assert.equal(2, docs.length);
                    console.log("Found the following records");
                    console.dir(docs);

                    console.log('new id', docs[0].seq);

                    //return 123;//docs.seq;
                });
            });
        }
    };
