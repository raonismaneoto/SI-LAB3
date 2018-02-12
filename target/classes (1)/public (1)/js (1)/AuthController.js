'use strict';

(function () {
    var main = angular.module('main');

    main.controller('AuthController', function AuthController(UserService, $state) {
        var authCtrl = this;

        authCtrl.hasToLogin = false;
        UserService.callBack = changeView;
        function load () {
            UserService.getLastUser().then(function success (response) {
                if(response.userName) {
                    UserService.currentUser = new User(response);
                } else {
                    authCtrl.hasToLogin = true;
                    $state.go('login');
                }
            });
        }

        function changeView(boolean) {
            authCtrl.hasToLogin = boolean;
        }
        load();

    });
})();