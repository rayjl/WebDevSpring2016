(function(){
    'use strict';

    angular
       .module("FormBuilderApp")
       .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location) {
        $scope.location = $location;
        $scope.logout = logout;

        function logout() {
            $rootScope.user = null;
        }
    }
})();