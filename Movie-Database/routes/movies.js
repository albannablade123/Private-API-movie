var express = require('express');
var router = express.Router();
const user = require('../models/User');
const axios = require('axios');
const jwt = require('jsonwebtoken');


const getMovieUrlController = require('../controllers/controller');


/* GET Movies Page */
router.get('/movies', verifyToken,function(req, res, next) {
  logger.debug("calling res send status");
  return res.sendStatus(403);
});

/* Return the list of all the users favourite movies*/
router.get('/movies/favorite', verifyToken, getMovieUrlController.getUserFavourite);

/* Insert favourite movies*/
router.post('/movies/favorite', verifyToken, getMovieUrlController.insertMovies);


/* Generate a dummy user */
router.post('/login', (req,res)=> {
  const user = {
    id: 1,
    name: 'hasan',
    password: 'television'
  }

  jwt.sign({user},'secretkey',(error,token) => {
    res.json({
      token
    });
  });
});

router.post('/movies/insertUser',  verifyToken, getMovieUrlController.insertUser);

/* Find movie, use it to call */
router.get(`/movies/:title`, verifyToken, getMovieUrlController.getMovieUrl);

//Format of token
//authorization: Bearer <access token>

//verify Token
async function verifyToken(req, res, next){
  //Get auth header value
  const bearerHeader = req.headers['authorization'];
  const token = bearerHeader.split(' ')[1];
  const userData = await jwt.verify(token,'secretkey', (error,decoded) => {
    return decoded.user;
  });
  //Check if undefined
  if(typeof bearerHeader !== 'undefined'){
    req.data = userData;
    next();
  }else{
    //Forbbiden
    res.sendStatus(403);
  }

}





// router.post('/movies/insertUser', function(req, res, next) {
//   user.create({ name: "Jane", password: "Jane_Doe" });
// });


module.exports = router;
