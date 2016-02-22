(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService) {
        $scope.update = update;
        $scope.user = $rootScope.user;

        /*
         * @param   {object} user   : user to update
         */
        function update(user) {
            UserService
                .updateUser(user._id, user, function(user) {
                    alert('Profile updated.');
                });
        }

    }

})();
