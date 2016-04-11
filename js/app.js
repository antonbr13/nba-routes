var app = angular.module('nbaRoutes', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push('httpRequestInterceptor');

    // routing configuration code

    $stateProvider

         .state('home', {
            url         : '/',
            templateUrl : 'js/home/homeTmpl.html',
            controller  : 'homeCtrl'
         })








// Take note of the /:team that's in the URL. Remember, that makes it so your application is able to keep track of certain states based on which team is located in the URL. For example, when the user visits yoursite.com/teams/utahjazz, in our controller $stateParams.team is going to be equal to 'utahjazz'. This allows us to then pass in the specific team into our getTeamData method that's on our service and get only that teams data. Also note that the menu in our index.html page has links that point to the different teams (which will be caught by :team in our router).

// we set up the router so that whatever a team is in the URL, that value would be the current value of $stateParams.team in our controller
         .state('teams', {
            url         : '/teams/:team',
            templateUrl : 'js/teams/teamTmpl.html',
            controller  : 'teamCtrl',

//The resolve object is going to have a method called teamData: which returns the promise that gets returned from teamService.getTeamData(). To be able to use the method getTeamData, we need to inject teamService into the teamData: method by adding it as a parameter.
            resolve: {teamData:
                  function(teamService, $stateParams){
                     return teamService.getTeamData($stateParams.team);
                  }
            }
         });
   //Add a $urlRouterProvider.otherwise('/'); block so that the router will redirect to the index page if the route the user types in is not recognized.
         $urlRouterProvider.otherwise('/');
});
