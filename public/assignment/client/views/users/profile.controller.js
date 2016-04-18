(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $location, UserService) {
        $scope.update = update;
        var user = $rootScope.user;

        if (user) {
            init();
        } else {
            console.log("No one logged in.");
            $location.url('/home');
        }

        function init() {
            $scope.user = user;
        }

        /*
         * @param   {object} user   : user to update
         */
        function update(user) {
            UserService
                .updateUser(user._id, user)
                .then(function(user) {
                    console.log(user);
                    alert('Profile updated.');
                });
        }

    }

})();
