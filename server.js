const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

const apiKey = '50f937d78ecd4ec7ae16a6a33468e086';

app.set('view engine','ejs'); //ejs necessity
app.use(express.static('public')); //access public folder
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;


    request(url, function (err, response, body) {
      if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body)
        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Enter a valid City'});
        } else {
          let celcius = Math.floor((weather.main.temp - 32) * 5/9)
          let weatherText = `It's ${celcius} ° Celcius in ${weather.name}!`;
          res.render('index', {weather: weatherText, error: null});
        }
      }
    });
})

app.listen(3000, function(){
    console.log(`server is started on port 3000`);
})
