angular.module('appRoutes', ['ngRoute', 'door3.css'])


.config(function($routeProvider, $locationProvider){
    $routeProvider
    
        .when('/', {
            templateUrl: 'app/views/partials/home.html',
            css: ['app/css/home.css','app/css/dashboard.css'],
            controller: 'MainController',
            controllerAs: 'main'
        })
        .when('/login', {
            templateUrl: 'app/views/partials/login.html',
            css: 'app/css/sign_form.css',
            controller: 'MainController',
            controllerAs: 'login'
        })
        .when('/signup', {
            templateUrl: 'app/views/partials/signup.html',
            css: 'app/css/sign_form.css',
            controller: 'UserCreateController',
            controllerAs: 'user'
        })
       
        .otherwise({ redirectTo : '/' })
    
    $locationProvider.html5Mode = true;
});