angular.module('requestCtrl', ['requestService'])

    .controller('RequestController', function(Request, socketio){
        var vm = this;

        Request.allRequests()
        	.success(function(data) {
        		vm.requests = data;
                for (var k = 0; k < vm.requests.length; k++){
                    vm.requests[k].color = randColor();
                }
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
            data.color = randColor();
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

        var randColor = function() {
            var colors = ["#1abc9c", "#16a085", "#f1c40f", "#f39c12", "#2ecc71", "#27ae60", "#e67e22", "#d35400", "#3498db", "#2980b9", "#e74c3c", "#c0392b", "#9b59b6", "#8e44ad", "#bdc3c7", "#34495e", "#2c3e50", "#95a5a6", "#7f8c8d", "#ec87bf", "#d870ad", "#f69785", "#9ba37e", "#b49255", "#b49255", "#a94136"];
            
            var i = Math.floor(Math.random() * colors.length);
            // $(this).css("background-color", colors[i]);
            console.log($(this).text());
            return colors[i];
        }

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
