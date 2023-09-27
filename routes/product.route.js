const router = require('express').Router();
// const db = require('./../db/config');    
const script = require('./../db/script');
const scriptProduct = script.product;


router.get('/', function(req, res) {
    var mysql = req.app.get('mysql');
    mysql.query(scriptProduct.findAll, function(err, results) {
        if (err) {
            res.json({
                err: true,
                message: 'Cannot connect to MySQL database'
            })
        } else {
            res.send(results)
        }
    });
});

//Get product by id
router.get('/:id', function(req, res) {
    const id = req.params.id;
    var mysql = req.app.get('mysql');
    mysql.query(scriptProduct.findOne(id), function(err, results) {
        if (err || results.length === 0) {
            console.error(err);
            res.json({
                err: true,
                message: 'Product not found.'
            })
        } else {
            res.send(results)
        }
    });
});


router.post('/', function(req, res) {
    const productData = req.body;
    var mysql = req.app.get('mysql');
    const sqlInsert = "INSERT INTO products (productID, productName, price, sellDate) VALUES (?,?,?,?)";
    
    mysql.query(sqlInsert, [productData.productID, productData.productName, productData.price, productData.sellDate], function(err, results) {
        if (err) {
            console.log(err);
            res.json({
                err: true,
                message: 'Error inserting the product.',
                error: err
            });
        } else {
            res.json({
                message: 'Product inserted successfully',
                data: results
            });
        }
    });
});



// DELETE Endpoint for Deleting a Product
router.delete('/:id', function(req, res) {
    const productId = req.params.id; // Get the product ID from the URL parameter
    var mysql = req.app.get('mysql');
    const sqlDelete = "DELETE FROM products WHERE productID = ?";
    
    mysql.query(sqlDelete, [productId], function(err, results) {
        if (err) {
            console.error(err);
            res.json({
                err: true,
                message: 'Error deleting the product.',
                error: err
            });
        } else {
            if (results.affectedRows === 0) {
                // If no rows were affected, the product with the given ID was not found
                res.json({
                    err: true,
                    message: 'Product not found.'
                });
            } else {
                res.json({
                    message: 'Product deleted successfully'
                });
            }
        }
    });
});

// PUT Endpoint for Updating a Product
router.put('/:id', function(req, res) {
    const productId = req.params.id; // Get the product ID from the URL parameter
    const productData = req.body; // Get the updated product data from the request body
    var mysql = req.app.get('mysql');
    const sqlUpdate = "UPDATE products SET productName = ?, price = ?, sellDate = ? WHERE productID = ?";
    
    mysql.query(sqlUpdate, [productData.productName, productData.price, productData.sellDate, productId], function(err, results) {
        if (err) {
            console.error(err);
            res.json({
                err: true,
                message: 'Error updating the product.',
                error: err
            });
        } else {
            if (results.affectedRows === 0) {
                // If no rows were affected, the product with the given ID was not found
                res.json({
                    err: true,
                    message: 'Product not found.'
                });
            } else {
                res.json({
                    message: 'Product updated successfully'
                });
            }
        }
    });
});




module.exports = router;