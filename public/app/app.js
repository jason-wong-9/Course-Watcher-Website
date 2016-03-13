angular.module('MyApp', ['mainCtrl', 'appRoutes', 'authService'])

.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptor');
})