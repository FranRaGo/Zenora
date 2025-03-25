const express = require('express');

const server = express();

server.get('/',(req,res)=>{
    res.send('Hola gense');
})

server.listen(3000,()=>{
    console.log('server');
}) 