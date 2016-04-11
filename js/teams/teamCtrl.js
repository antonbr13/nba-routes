var app = angular.module('nbaRoutes');
// the resolved data from the router needs to be injected into the controller
app.controller('teamCtrl', function ($scope, $stateParams, teamService, teamData) {

   $scope.teamData = teamData;


   $scope.newGame = false;

   $scope.toggleNewGameForm = function() {
      $scope.showNewGameForm = !$scope.showNewGameForm;
   };

   if($stateParams.team === 'utahjazz'){
      $scope.homeTeam = 'Utah Jazz';
      $scope.logoPath = 'images/jazz-logo.png';
   }
   else if ($stateParams.team === 'losangeleslakers') {
      $scope.homeTeam = 'Los Angeles Lakers';
      $scope.logoPath = 'images/lakers-logo.png';
   }
   else if ($stateParams.team === 'miamiheat') {
      $scope.homeTeam = 'Miami Heat';
      $scope.logoPath = 'images/heat-logo.png';
   }


   $scope.submitGame = function() {
         newGame.homeTeam = $scope.homeTeam.split(' ').join('').toLowerCase();
         teamService.addNewGame($scope.newGame)

// Call .then and pass it a callback function. this function is then going to call the getTeamData service, passing it $scope.newGame.homeTeam. We've added a new game to the home team's schedule and now we need to go and get the new data that's in our database.
         .then(function(){
            teamService.getTeamData($scope.newGame.homeTeam)

// You should notice that the getTeamData method is also returning a promise. So just like before, call .then immediately after you call getTeamData() and give it a callback function which accepts parameter (which is going to be the data returned from the getTeamData method)
            .then(function(response){
                  $scope.teamData = response;
                  $scope.newGame = {};
                  $scope.showNewGameForm = false;
            });
         });
   };


});
