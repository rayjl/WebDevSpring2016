(function(){
    'use strict';

    angular
        .module("ZapApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location) {
        $scope.location = $location;
    }
})();
