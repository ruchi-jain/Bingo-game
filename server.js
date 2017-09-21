var express = require('express');
var bodyParser = require('body-parser');
var low = 1, high = 100;
// Create our app
var app = express();
var random_ball_data = [];

app.use(express.static('public'));

// Configure app for bodyParser()
// lets us grab data from the body of POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set up port for server to listen on
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up on port 3000');
});

// API Routes
var router = express.Router();

// Routes will all be prefixed with /api
app.use('/api', router);

// Test Route
router.get('/', function(req, res) {
  res.json({message: 'Welcome to our API!'});
});

function randomInt (low, high) {
    var rand = Math.floor(Math.random() * (high - low + 1) + low);
    if(random_ball_data.indexOf(rand) == -1) {
        random_ball_data.push(rand); 
    } else {
        randomInt(1, 100);
    }
    return random_ball_data[random_ball_data.length-1]; 
}

router.route('/check_winner').post(function(req, res) {
    var received_val = req.body.selectedItems;
    if(random_ball_data.length > 0) {
        if(received_val.every(r=> random_ball_data.indexOf(r) >= 0)) {
            res.json({ "success_msg": "You won the game" , "response_code" : 1});
        } 
    }
    res.json({ "error_msg": "All numbers are not crossed in any of your ticket" , "response_code" : 0}); 
  });

router.route('/random_ball').get(function(req, res) {
    if(random_ball_data.length < 100) {
        res.json({"response_code" : 1, "number": randomInt(1,100)});
    } else {
        random_ball_data = [];
        res.json({ "error_msg": "All numbers has been drawn. Refresh browser to start new game" , "response_code" : 0});
    }
  });