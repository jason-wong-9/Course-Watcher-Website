angular.module('MyApp', ['mainCtrl', 'appRoutes', 'authService', 'userCtrl', 'userService', 'requestService', 'requestCtrl', 'capitalizeDirective', 'reverseDirective', 'firstDirective', 'angularMoment'])

.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptor');
})