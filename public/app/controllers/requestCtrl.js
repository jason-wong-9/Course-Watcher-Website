angular.module('requestCtrl', ['requestService'])

    .controller('RequestController', function(Request, socketio){
        var vm = this;

        Request.allRequests()
        	.success(function(data) {
        		vm.requests = data;
        });


    	vm.createRequest = function() {
    		console.log(vm.requestData);
    		Request.create(vm.requestData)
    			.success(function(data) {
    				vm.storyData = '';
    				
    				vm.message = data.message;

    				// vm.requests.push(data);
    			});
    	};

        socketio.on('request', function(data) {
            vm.requests.push(data);
        })


    	vm.isEmpty = function() {
    		return (vm.requests == 0);
    	};
        
        vm.deleteRequest = function(id) {
            //console.log(id);
            //console.log(vm.requests);
            Request.delete(id)
                .success(function(data){
                    console.log("deleted");
                });
        }

        
});
