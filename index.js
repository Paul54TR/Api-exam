const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const routes = require('./routes/api')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use('/api',routes);

mongoose.connect(process.env.MONGODB || 'mongodb://localhost:27017/OSCE',(err,res)=>{
    if(err){
        return console.log("ERROR AL CONECTAR A BASE DE DATOS: " + err);
    }
    console.log("Conexión a la base de datos establecida");
})

app.listen(port,()=>{
    console.log("Servidor corriendo en puerto: " + port );
});