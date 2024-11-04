// Libreria express
const express = require('express');
const routes = require('./routes');
const { request, response } = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helpers = require('./helpers');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

require('./models/persona');
require('./models/helado');
require('./models/pedido');
require('./models/metodoPago');
require('./models/factura');
require('./models/administrador');

// Conexion a la base de datos
const db = require('./config/bd');

db.sync()
    .then(()=>console.log('conectado a la BD'))
    .catch(error=>console.log(error))

// Hace posible que se ejecute la aplicacion
const app = express();

// Direccionamiento carpeta de estilos
app.use(express.static('public'));

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended:true}));

app.set('views', path.join(__dirname,'./views'));

app.use(flash());

//Manejo de sesiones
app.use(cookieParser());

app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());

app.use(passport.session());

app.use((request, response, next)=>{
    response.locals.vardump = helpers.vardump;
    response.locals.mensajes= request.flash();
    response.locals.user = request.user;
    next();
});

// Libreria bodyparser que traduce los datos enmascarados del post

app.use('/', routes());

// Puerto para el servidor
app.listen(5000);

