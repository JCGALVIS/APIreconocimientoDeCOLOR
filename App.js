var express = require("express");
var admin = require('firebase-admin');
var serviceAccount = require('./firebaseKey/serviceAccountKey.json');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // soporte para bodies codificados en jsonsupport
app.use(bodyParser.urlencoded({ extended: true })); // soporte para bodies codificados

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://reconocimientodecolor.firebaseio.com"
});

//Ejemplo: GET http://localhost:8080/items?filter=ABC
app.get('/items', function (req, res) {
    var filter = req.query.filter;
    res.send('Get filter ' + filter);
    registrarRealTimeColor(filter);
});

var db = admin.database();
var ref = db.ref("colores");

function registrarRealTimeColor(filter) {
    var usersRef = ref.child("colorEjecutar");
    usersRef.set({
        color: filter
    });
}

var server = app.listen(8080, function () {
    console.log('Server is running..'); 
});