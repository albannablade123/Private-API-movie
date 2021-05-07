# Private-API-movie
A private API server that will return image url of a movie using nodeJS and express

The application requires two important requirements/dependencies

The first one is to run the web server, since its locally hosted the user requires the latest version of NodeJS

The second requirement/dependency is Express, as it runs on express.

The first step is to install the dependencies. This can be done by running the command "npm install". 

The second step is to connect it to the SQL server, this can be done in the config file located at Movie-Database\config\config.json, and under development, it should show input for the sql details, 


Now all that is left is to run the server, and sequalize will automatically create both User and favourite movies table if it doesnt exist. 

============================ API =====================================

Authentication
For authentication and generating bearer token, JSON web token is used, and this can be initialize by running POST "/login", this will initialize
a static user along with a token. This step is important as without it, accessing other pages will return a Forbidden status. The token will store the user detail in 
an encrypted form. Each and every function is accompanied by the middle ware verifytoken, this will authenticate the user through the token and will return Forbidden
if the user do not have the token.

Controller
THe controller file is located in Movie-Database\controller\controllers.js

Logger
Pino Logger is used

"/GET/movies"
If this end point is reached, then it will return forbidden

"/GET/movies/title"
When this is called, it will go to the controller and call the function getMovieUrl, this will use Axios to send a request to the API, and from there will return
the URL of the movie based on the title given.

"/GET/movies/favorite"
When this is called, it will again go to the controller and fetch the function getUserFavourite, this function will fetch the list of the users favourite movie
from the database and this will use Axios to send a request to the API, and from there will send a response of Json body along with a cookie with a dummy session id

"/POST/movies/favorite"
When this is called, it will again go to the controller and fetch the function insertMovies, this function will insert Users favourite movie into the database, through
sequelize create function.

