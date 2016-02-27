(function(){
    'use strict';

    angular
        .module("ZapApp")
        .controller("MainController", MainController);

    function MainController($location, $scope) {
        $scope.$location = $location;
    }
})();
