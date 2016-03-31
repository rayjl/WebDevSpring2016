(function(){
    'use strict';

    angular
        .module("ZapApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location) {
        $scope.location = $location;
        $scope.logout = logout;

        function logout() {
            $rootScope.user = null;
            $location.url("/home");
        }
    }
})();