/**
 * UploadControllerController
 *
 * @description :: Server-side logic for managing Uploadcontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var CoreReadDbService = require('../../services/back/CoreReadDbService');
var CoreInsertDbService = require('../../services/back/CoreInsertDbService');
var CoreDeleteDbService = require('../../services/back/CoreDeleteDbService');

module.exports = {

    /**
     * `UploadControllerController.imageProduct()`
     */
    saveImageProduct: function (req, res, idProduct) {

        console.log('uploadController - imageProduct - idProduct', req.params.idProduct); // we have the product id

        var idProduct = req.params.idProduct;

        var fs = require("fs");

        console.info('image upload');

        req.file('file').upload(function (err, uploadedFiles) {

            console.info('uploaded file');
            console.info(uploadedFiles);

            if (uploadedFiles[0].fd) {
                var filePath = uploadedFiles[0].fd;
                var productId = 1;
                var filePathFinal = '/images/product/'+idProduct+ '.png';

                // copy of the file to assets/images/
                fs.createReadStream(filePath).pipe(fs.createWriteStream('assets'+filePathFinal));
            }

            // add the imagePath for this product

            console.log('UploadController - saveImageProduct - start' );
            CoreInsertDbService.saveImageProduct(idProduct, filePathFinal);

        });

        return res.json({
            todo: 'imageProduct() is not implemented yet!'
        });
    }
};

