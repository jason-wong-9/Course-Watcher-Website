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
            templateUrl: 'app/views/partials/login.html',
            css: 'app/css/login.css',
            controller: 'MainController',
            controllerAs: 'main'
        })
        .when('/signup', {
            templateUrl: 'app/views/partials/signup.html',
            css: 'app/css/signup.css'
        })
       
        .otherwise({ redirectTo : '/' })
    
    $locationProvider.html5Mode = true;
});