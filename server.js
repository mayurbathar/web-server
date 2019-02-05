const express = require('express');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(__dirname + '\public'));

app.set('view engine','hbs');
 // log file 
app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', () => {
        console.log('callback');
    });
    next();
});

app.use((req,res,next) => {
    res.render('maintenance.hbs');
});

app.get('/', (req, res) => {
    res.send(__dirname);
    res.send({
        name : 'Mayur',
        likes : {
            count : 120
        }
    })
});

app.listen(PORT, ()=>{
    console.log("server is running on port 3000")
});