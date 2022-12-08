let express = require('express');
const cors = require('cors');
let morgan = require('morgan')
const app = express();

app.use(morgan('tiny'))

//imports routes
const userRoutes = require('./services/users/servicesUsers')
const analisisRoutes = require('./services/analisis/servicesAnalisis')


//middleware
app.use(cors())


//settings
let port = 9000;
let ip = "127.0.0.1";
app.listen(port,ip);
app.use(express.json()) 

console.log('Listening on port', port);


//set headers enable
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Allow', 'GET, POST, OPTIONS');
//     next();
// });


//routes or services
app.use(userRoutes);
app.use(analisisRoutes);


//run
app.listen(app.get('port'), () => {
    console.log('Server on Port 9000')
})

