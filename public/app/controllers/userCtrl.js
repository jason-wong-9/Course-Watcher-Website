angular.module('userCtrl', ['userService'])

.controller('UserController', function(User){
   var vm = this;

   
   User.all()
        .success(function(data){
            vm.users = data;
            
        })
        
})

.controller('UserCreateController', function(User, $location, $window){
    var vm = this;
    console.log(vm.userData);
    vm.signupUser = function() {
        vm.message = '';
        
        User.create(vm.userData)
            .then(function(response){
            	console.log(response);
                vm.userData = {};

                vm.message = response.data.message;
                console.log(vm.message);
                console.log(response.data.token);
                $window.localStorage.setItem('token', response.data.token);
                $location.path('/');
            })
    }
})