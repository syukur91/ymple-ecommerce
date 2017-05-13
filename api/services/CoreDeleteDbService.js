var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');

var host = sails.config.connections.mongodbServer.host;
var port = sails.config.connections.mongodbServer.port;
var database = sails.config.connections.mongodbServer.database;
var urlConnection = "mongodb://" + host + ":" + port + '/' + database;

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

        deleteProduct: function (productId) { // Insert a product in table product

            var MongoClient = require('mongodb').MongoClient;
            console.log('CoreDeleteDbService - url connexion ', urlConnection);

            MongoClient.connect(urlConnection).then(function (db) {

                if ( sails.config.demoMode != 1 ) {

                }

            });
        },

        getConnexion: function () {
            var MongoClient = require('mongodb').MongoClient;
            console.log('InsertDbService - url connexion ', urlConnection);
            return MongoClient;
        }

    }