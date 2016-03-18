angular.module('firstDirective', [])
.filter('first', function() {
    return function(input) {
      	return (!!input) ? input.charAt(0).toUpperCase() : '';
    }
});