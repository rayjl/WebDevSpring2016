(function(){
    'use strict';

    angular
        .module("ZapApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $location, UserService) {
        $scope.update = update;
        var user = $rootScope.user;

        // Execute init to fill the profile page if valid user
        if (user) {
            console.log('Valid user identified.');
            init();
        } else {
            alert('Invalid user set.');
            $location.url('/home');
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
                    .updateUser(user._id, user)
                    .then(function (user) {
                        console.log(user);
                        alert('Profile updated.');
                    });
            } else {
                alert('Please verify password.')
            }
        }

    }

})();
