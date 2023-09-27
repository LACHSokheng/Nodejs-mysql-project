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

//

// app.post("/products/", (req,res) => {
//     //get parameters from body json object
//     const body = req.body;
//     console.log(body);
//     var sqlInsert = "INSERT INTO products (prodductID, productName, price, sellDate) VALUES (?,?,?,?)";
//     mysql.query(sqlInsert,[body.productID, body.productName, body.price, body.sellDate],(err, results) => {
//         if (err){
//             res.json({
//                 err: true,
//                 message: err,
//             })
//         }else{
//             res.json({
//                 message: "Insert Successfully",
//                 data: results
//             })
//         }

//     })
// });

module.exports = router;