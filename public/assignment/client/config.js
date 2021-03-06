(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
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
                    controller: "ProfileController",
                    resolve: {
                        "auth" : function(UserService) {
                            return UserService.loggedin();
                        }
                    }
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    resolve: {
                        "auth" : function(UserService) {
                            return UserService.loggedin();
                        }
                    }
                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormController"
                })
                .when("/user/:userId/form/:formId/fields", {
                    templateUrl: "views/forms/field.view.html",
                    controller: "FieldController"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });

})();