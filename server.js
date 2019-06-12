const express = require('express')
const app = express()
const mongoose = require("mongoose");
const cors = require('cors');
const User = require('./models/users.js');
const Exercise = require('./models/exercises.js');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://elisal:pdnlxx021@ds231387.mlab.com:31387/exercise-tracker');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Connection to the database successful');
});


app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/users', function(req, res){
    User.find({}, function(err, user){
        if(err){
            console.log(err);
        } else{
            res.json(user);
            //console.log(req.body);
        }
    })
});

app.get('/api/exercise/:userId', function(req, res){
    Exercise.find({user: req.params.userId}, function(err, exercise){
        if(err){
            console.log(err);
        } else{
            res.json(exercise);
        }
    })
});

app.post('/api/users', function(req, res) {
    User.findOne({username: req.body.username}, function(err, user){
        if (err) throw err;

        if(!user){
            User.create({
                username: req.body.username,
                created: Date.now()
            }, err =>{
                if(err) throw err;
            });
        }
        else if (user){
            res.send('username is taken')
        }
    })
});

app.post('/api/exercise/:userId', function(req, res) {
    Exercise.create({
        user: req.params.userId,
        name: req.body.exercise,
        date: Date.now()
    }, err =>{
        if(err) throw err;
    });
});

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

//https://hackernoon.com/how-to-combine-a-nodejs-back-end-with-a-reactjs-front-end-app-ea9b24715032