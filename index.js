const express = require('express');
const { dbConnection } = require('./public/database/config');
require('dotenv').config();
const cors = require('cors');

console.log(process.env);

const app = express();

dbConnection();

//cors
app.use(cors());

//direc publico
app.use(express.static('public'));


app.use(express.json());


//rutas 
app.use('/api/auth', require('./routes/auth'));

app.use('/api/events', require('./routes/events'));





app.listen(process.env.PORT, () => {
    console.log(`server corriendo en el puerto ${ process.env.PORT }`)
});