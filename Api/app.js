const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/myapp');

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
const port = 4000;
app.use(express.json());
app.use(cors());


app.use(express.static(path.join(__dirname,'public')));

app.use('/api/auth',require('./routes/auth'));
app.use('/api/books',require('./routes/books'));

app.listen(port,()=>{
    console.log('server started at port:'+port);
})