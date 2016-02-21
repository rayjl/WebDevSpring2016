(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $location, UserService) {
        $scope.update = update;

        /*
         * @param   {object} user   : user to update
         */
        function update(user) {


        }

    }

})();
