const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const route = require('./routes/route');

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/myapp');
//mongoose.connect("mongodb://localhost:27017/contact-list");
mongoose.connection.on('connected',()=>{
    console.log('connected to database mongodb');
});

mongoose.connection.on('error',(err)=>{
    if(err)
    {
        console.log('error in db connectintio  '+err);
    }
});

const app = express();
const port = 3000;

app.use(cors());


app.use(bodyparser.json());


app.use(express.static(path.join(__dirname,'public')));


app.use('/api',route);

app.get('/',(req,res)=>{
    res.send('foobar');
})

app.listen(port,()=>{
    console.log('server started at port:'+port);
})