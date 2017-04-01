//write code that talks with key.js file to get tweets
// var keyJS = require("./key.js");
var Twitter = require("twitter")
var spotify = require("spotify");
var fs = require('fs');
var request = require('request');
var keysJS = require("./key.js");




var action = process.argv[2];
var value = process.argv[3];

// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
switch (action) {
  case "my-tweets":
    tweetMe();
    break;
  case "spotify-this-song":
    songMe();
    break;
  case "movie-this":
    movieMe();
    break;
  case "do-what-it-says":
    doWhat();
    break;
};

function tweetMe() {
  
  var params = {
    screen_name: 'ImanBenjamin_', 
    count: 20,
  };

  var client = new Twitter ({
    
    consumer_key: keysJS.twitterKeys.consumer_key,
    consumer_secret: keysJS.twitterKeys.consumer_secret,
    access_token_key: keysJS.twitterKeys.access_token_key,
    access_token_secret: keysJS.twitterKeys.access_token_secret,
  });

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for (var i =0; i < tweets.length; i++){
          var tweeter = tweets[i];
          console.log(tweeter.text);
          console.log("---------------------------");
        }
      }
  });

};


// Spotify this song
function songMe(input) {
    var input = process.argv[3];
    if (!input) {
        input = "The Sign"
    }
    var parameter = input;

    spotify.search({ type: 'track', query: input }, function(err, data) {
        // console.log(data);
        if (!err) {
            var trackInfo = data.tracks.items;
                if (trackInfo[0] != undefined) {
                    console.log("Artist: " + data.tracks.items[0].artists[0].name);
                    console.log("Song Name: " + data.tracks.items[0].name);
                    console.log("Preview Link: " + data.tracks.items[0].external_urls.spotify);
                    console.log("Album: " + data.tracks.items[0].album.name);
                }
            }
        
         else {
             console.log('Error occurred: ' + err);
            return false;    
         }

    });
};









// OMDB Movie Request code

function movieMe() {

var t = encodeURI(value);

if (t === null) {
    t = "Mr. Nobody";
  }

var movie = "http://www.omdbapi.com/?t=" + t;

// Then run a request to the OMDB API with the movie specified
request(movie, function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {
    var movieTitle = JSON.parse(body).Title;
    var ratings = JSON.parse(body).Ratings[1];
    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("The movie's title is: " + JSON.parse(body).Title);
    console.log(movieTitle + " came out in " + JSON.parse(body).Year);
    console.log(movieTitle + " is rated " + JSON.parse(body).imdbRating);
    console.log(movieTitle + " is a film from " + JSON.parse(body).Country);
    console.log(movieTitle + " is in " + JSON.parse(body).Language);
    console.log("Plot of " + movieTitle + ": " + JSON.parse(body).Plot);
    console.log("The cast of " + movieTitle + " includes: " + JSON.parse(body).Actors);
    console.log("Rotten Tomatoes gave " + movieTitle + " a rating of " + ratings.Value);
    // console.log("Rotten Tomatoes Page for " + movieTitle + " is " + );
    // NEED ROTTEN TOMATOES URL!!!!!!!!!!!!
    // console.log('error:', error)

  }
  else {
    console.log("The movie's title is: Mr.Nobody");
    console.log("Mr.Nobody came out in 2009");
    console.log("Mr.Nobody is rated 7.9");
    console.log("Mr.Nobody is a film from Belgium, Germany, Canada, France");
    console.log("Mr.Nobody is in English, Mohawk");
    console.log("Plot of Mr.Nobody: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.");
    console.log("The cast of Mr.Nobody includes: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham");
    console.log("Rotten Tomatoes gave Mr.Nobody a rating of 64%");
  }


});
};

// Random task code

function doWhat(inquiry) {
  fs.readFile('random.txt', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    }
    var output = data.toString().split(','); //splits string from random.txt into an array
    task = output[0]; //set task from random.txt array
    inquiry = output[1]; //set request from random.txt array
    //runs new parameters back through switch case
    switch (task) {
      case "my-tweets":
        tweetMe();
        break;
      case "spotify-this-song":
        songMe();
        break;
      case "movie-this":
        movieMe();
        break;
      case "do-what-it-says":
        doWhat();
        break;

      default:
          console.log('Nothing registered. Try again.');

    }; //end of switch
  }); //end of read file
}; 
