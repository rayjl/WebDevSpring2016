(function(){
    'use strict';

    angular
        .module("ZapApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html"
                })
                .when("/home", {
                    templateUrl: "views/home/home.view.html"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });

})();