'use strict';

(function() {
    var app = angular.module("main");

    app.controller("HomeController", function HomeController($state, StorageService) {
        var homeCtrl = this;

        homeCtrl.user = StorageService.user;

        homeCtrl.sayHello = function sayHello() {
            StorageService.sayHello().then(function success(value) { alert(value); });
        };
       
    });
})();