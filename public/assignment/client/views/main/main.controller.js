(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($location, $scope) {
        $scope.$location = $location;
    }
})();
