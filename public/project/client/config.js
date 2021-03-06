(function(){
    'use strict';

    angular
        .module("ZapApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
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
                .when("/people", {
                    templateUrl: "views/users/people.view.html",
                    controller: "PeopleController"
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController"
                })
                .when("/details", {
                    templateUrl: "views/data/details.view.html",
                    controller: "DetailsController"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });

})();