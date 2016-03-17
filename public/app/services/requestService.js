angular.module('requestService', [])

.factory('Request', function($http) {
    var requestFactory = {};
    
    requestFactory.create = function(requestData) {
        return $http.post('/api', requestData);
    }
    requestFactory.allRequests = function() {
        return $http.get('/api');
    }

    requestFactory.delete = function(requestId) {
    	return $http.delete('/api/requests/' + requestId);
    }
    
    return requestFactory;
});