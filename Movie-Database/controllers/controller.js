const apiKey = '3c7d7f37'
const axios = require('axios');
const logger = require('pino')()
const Sequelize = require('sequelize');
var models = require('../models/index');
var userFunction = require('../models/').User;
var movie = require('../models/').favourite_movies;
var cookieParser = require('cookie-parser');
dummyData = ['shrek', 'titanic', 'Jurassic Park', 'Transformer'];

exports.getMovieUrl = (req, res, next) => {
  var movieTitle = req.params.title;
  logger.info(req);
  axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}`)
    .then((response) => {
      console.log(response.data);
      res.send(response.data.Poster);
      console.log(response.data['Poster']);
    });
}
//

async function fetchAll(listFavourite) {
  var o = []

 for (var i = 0; i < listFavourite.length; i++) {
   //call request to the API using axios
   var result = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${listFavourite[i]}`);
     o.push({title: listFavourite[i] ,url :result.data['Poster']});
 }
 return o;
}

exports.getUserFavourite = async (req, res, next) => {
  //Log request
  logger.info(req);
  var userId = req.data.id;

  //Retrieve all users favourite movies from Database
  var responseObject = await movie.findAll({
    attributes: ['title'],
    where: {
      UserId: userId
    }
  });

  //Convert from object to list
  const objectArray = Object.entries(responseObject);

  var listFavourite = []

  objectArray.forEach(([key, value]) => {
    listFavourite.push(value.title)
  });

  //Cookie
  res.cookie('rememberme', 'yes','11112333');
  //Json URLs
  res.send(await fetchAll(listFavourite));
}

exports.insertUser = async (req, res) => {
  //Log request
  logger.info(req);

  //Create a dummy user
  dummyUser = {
    name: 'John',
    password: 'password123'
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(dummUser.password, salt);

  await userFunction.create({
    name: dummUser.name,
    password: hashedPass
  }).then(console.log('saved succesfully'));

}
exports.insertMovies = async (req, res) => {
  //Log request
  logger.info(req);

  var userId = req.data.id;
  var movieIndex = req.query.movieId
  await movie.create({
    title: dummyData[movieIndex],
    UserId: userId
  }).then(console.log('saved succesfully'));

}
