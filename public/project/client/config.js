(function(){
    'use strict';

    angular
        .module("ZapApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/home", {
                    templateUrl: "views/home/home.view.html"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html"
                })
                .when("/data", {
                    templateUrl: "views/data/analytics.view.html"
                })
                .when("/searchResults", {
                    templateUrl: "views/data/searchResults.view.html"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });

})();