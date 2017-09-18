var express = require('express');
var bodyParser = require('body-parser');
var low = 1, high = 100;
// Create our app
var app = express();
var random_ball_data = [];
var i = 0;

app.use(express.static('public'));

// Configure app for bodyParser()
// lets us grab data from the body of POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set up port for server to listen on
app.listen(3000, function () {
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
    var j = i;
    var rand = Math.floor(Math.random() * (high - low + 1) + low);;
    if(random_ball_data.indexOf(rand) > -1) {
        randomInt(1, 100);
    } else {
        random_ball_data[j] = rand; 
        i++;
    }
    return random_ball_data[j] 
}

//function checkWinner(winData) {
//    winData.forEach(function(val){
//        
//    })
//}

router.route('/random_ball').get(function(req, res) {
    res.json(randomInt(1,100));
  });

router.route('/bingo')
  .post(function(req, res) {
    checkWinner(req.data);
    vehicle.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Vehicle was successfully manufactured'});
    });
  })