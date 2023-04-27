const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { dbConnection } = require('./config/config');
require('dotenv').config();

const { logErrors, errorHandler, boomErrorHandler, queryOrmErrorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use( express.json() ); // para analizar el cuerpo de las solicitudes HTTP que contienen datos en formato JSON.

// const whiteList = ['http://localhost:8080', 'https://myappxd.co']; // estos son los origenes de los que si quiero recibir peticiones

// const options = {
//   origin : (origin , callback) => {
//     if ( whiteList.includes(origin) ) {
//         callback(null, true);
//     } else {
//         callback( new Error('No Permitido'));
//     }
//   }
// }

// app.use( cors( options ) );
app.use(cors()); // todos podrias hacer peticiones

routerApi( app );

//Conexion a la base de datos
dbConnection();

app.use( logErrors );
app.use( queryOrmErrorHandler );
app.use( boomErrorHandler );
app.use( errorHandler );

app.listen( process.env.PORT , () => {
  console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
})
