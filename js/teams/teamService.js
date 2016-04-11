var app = angular.module('nbaRoutes');

app.service('teamService', function ($http, $q) {

    // service code

    this.addNewGame = function(gameObject) {
       var url = 'https://api.parse.com/1/classes/' + gameObj.homeTeam;

       if (parseInt(gameObj.homeTeamScore) > parseInt(gameObj.opponentScore)) {
          gameObj.won = true;
       }
       else {
          gameObj.won = false;
       }
       return $http({
          method : "POST",
          url    : url,
          data   : gameObj
       })
       .then(function(response) {
          console.log(response);
          return response;
       });
    };


    this.getTeamData = function(team) {
      var url = 'https://api.parse.com/1/classes/' + team;
      var deferred = $q.defer();

      $http({
         method : "GET",
         url    : url
      })
      .then(function(response) {
         var results = response.data.results;

         var wins = 0;
         var losses = 0;


// Loop over results (which is an array of game objects) and check the .won property on each object in the results array, if the .won property is true, increment wins by 1. If .won is not true, increment losses by 1.
         results.forEach(function(obj) {
            if(obj.won){
               wins++;
            }
            else{
               losses++;
            }
         });


// Below are the updated wins and losses variables
         results.wins = wins;
         results.losses = losses;


//  resolve our promise we made earlier with the results variable (so we can access all the games in our controller)
         deferred.resolve(results);
      });


// Make sure that our getTeamData method has a return! Because we are modifying the data we receive from api.parse.com before resolving it, we will need to return the promise on the deferred object rather than returning the $http call like we did in our addNewGame method
      return deferred.promise;

   };




});
