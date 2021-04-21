const express = require('express');
const config = require('./config/index');
const app = express();

//Includes 
const Duplication = require('./src/models/duplication');

const duplication = new Duplication();

// Data asign
duplication.setdata(4100, 8, 3, 0);

console.log('Tamaño inicial', duplication.inicialSize());
console.log('Tamaño despues de 12', duplication.sizeAfter(12));
console.log('Lista ');

let list = duplication.sizeList(12, 2);
console.log(list);
console.log('------- Problem two');

duplication.setdata(0, 0, 18, 1200);
let list1 = duplication.sizeList(38, 4);
console.log(list1);

console.log('Tamaño 500000 =', duplication.sizeTime(500000));



app.listen(config.api.port, () => {
    console.log('APP in pprt ', config.api.port);
});