angular.module('appRoutes', ['ngRoute', 'door3.css'])


.config(function($routeProvider, $locationProvider){
    $routeProvider
    
        .when('/', {
            templateUrl: 'app/views/partials/home.html',
            css: 'app/css/home.css',
            controller: 'MainController',
            controllerAs: 'main'
        })
        .when('/login', {
            templateUrl: 'app/views/pages/login.html'
        })
        .when('/signup', {
            templateUrl: 'app/views/pages/signup.html'
        })
       
        .otherwise({ redirectTo : '/' })
    
    $locationProvider.html5Mode = true;
});