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
})

.factory('socketio', function($rootScope) {
    var socket = io.connect();
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
});