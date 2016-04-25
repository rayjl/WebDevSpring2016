(function() {
    'use strict';

    angular
        .module("ZapApp")
        .controller("PeopleController", PeopleController);

    function PeopleController($scope, $rootScope, UserService) {
        $scope.deleteFollowing = deleteFollowing;
        var user = $rootScope.user;

        // Execute init to fetch forms if user valid
        if (user) {
            init();
        } else {
            alert('Invalid user set.');
        }

        /*
         * This function inits the people page
         */
        function init() {
            $scope.user = $rootScope.user;
            $scope.following = $scope.user.following;
            $scope.followers = $scope.user.followers;
        }

        /*
         * @param   {int} index     : index of the following to delete
         */
        function deleteFollowing(index) {
            // Delete the user from the view and the user object
            UserService
                .deleteFollowingById($scope.user, $scope.following[index]._id)
                .then(function(user) {
                    $rootScope.user = user;
                    init();
                });
        }

    }

})();