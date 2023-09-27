
const express = require('express');
const app = express();
app.use(express.json());
const db = require('./db/config'); 

app.use(require('./routes'));

// define global variable
app.set('mysql', db); 

app.listen(4000, () =>{
    console.log('listening on port 4000');
});

app.on('close', function(){
    db.end();
});