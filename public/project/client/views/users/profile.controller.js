(function(){
    'use strict';

    angular
        .module("ZapApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService) {
        $scope.update = update;
        var user = $rootScope.user;

        // Execute init to fetch forms if user valid
        if (user) {
            init();
        } else {
            alert('Invalid user set.');
        }

        /*
         * This function inits the profile page
         */
        function init() {
            $scope.user = user;
        }

        /*
         * @param   {object} user       : user to update
         * @para    {string} vPassword  : password verification
         */
        function update(user, vPassword) {
            if (user.password == vPassword) {
                UserService
                    .updateUser(user._id, user, function (user) {
                        alert('Profile updated.');
                    });
            } else {
                alert('Please verify password.')
            }
        }

    }

})();
