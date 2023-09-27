module.exports = {
    product: {
        findAll: 'SELECT * FROM products',
        findOne: (id) => `SELECT * FROM products WHERE productID = ${id}`
    }
}