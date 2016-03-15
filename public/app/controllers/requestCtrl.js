angular.module('requestCtrl', ['requestService'])

    .controller('RequestController', function(Request){
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

    				vm.requests.push(data);
    			});
    	};


    	vm.isEmpty = function() {
    		return (vm.requests == 0);
    	};
        


        
});
