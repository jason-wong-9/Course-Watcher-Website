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
        });

        socketio.on('requestUpdate', function(data) {
            console.log(data);
            for (var i = 0; i < vm.requests.length; i++){
                if (vm.requests[i]._id == data._id){
                    vm.requests[i] = data;
                }
            }

        })


    	vm.isEmpty = function() {
    		return (vm.requests == 0);
    	};
        
        vm.deleteRequest = function(id) {

            Request.delete(id)
                .success(function(data){
                    console.log("deleted");
                    var index = getIndex(id);
                    deleteIndex(index);

                });
        };
        var getIndex = function(id){
            for (var i = 0; i < vm.requests.length; i++){
                if (vm.requests[i]._id == id){
                    return i;
                }
            }
            return -1;
        }

        var deleteIndex = function(index){
            if (index > -1) {
                vm.requests.splice(index, 1);
            }      
        }

        
});
