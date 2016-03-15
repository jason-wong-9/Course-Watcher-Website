angular.module('requestService', [])

.factory('Request', function($http) {
    var requestFactory = {};
    
    requestFactory.create = function(requestData) {
        return $http.post('/api', requestData);
    }
    requestFactory.allRequests = function() {
        return $http.get('/api');
    }
    
    return requestFactory;
});