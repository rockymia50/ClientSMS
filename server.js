const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const socketio = require('socket.io');
require("dotenv").config();
let plivo = require('plivo');


// Init app
const app = express();

// Template engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// Public folder setup
app.use(express.static(__dirname + '/public'));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Index route
app.get('/', (req, res) => {
    res.render('index');
});

// Catch form submit
app.post('/client', (req, res) => {
    event
    // res.send(req.body);
    console.log(req.body);
    var phoneNum = 1 + req.body.number;
    var messageSent = req.body.message;
        // As the auth_id and auth_token are unspecified, Plivo will fetch them from the PLIVO_AUTH_ID and PLIVO_AUTH_TOKEN environment variables.
    var client = new plivo.Client();
    client.messages.create(
        "17037750874", // src
        phoneNum, // dst
        messageSent, // text
    ).then(function (response) {
        console.log(response);
    }, function (err) {
        console.error(err);
    }); 
});

app.all('/receive_sms/', function(request, response) {
    // Sender's phone number
    var from_number = request.body.From || request.query.From;
    // Receiver's phone number - Plivo number
    var to_number = request.body.To || request.query.To;
    // The text which was received
    var text = request.body.Text || request.query.Text;
    console.log('Message received - From: ', from_number, ', To: ', to_number, ', Text: ', text);
    response.send("Message received");
});



// Define port
const port = 3000;

// Start server
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

// Connect to socket.io
const io = socketio(server);
io.on('connection', (socket) => {
    console.log('Connected');
    io.on('disconnect', () => {
        console.log('Disconnected');
    })
});