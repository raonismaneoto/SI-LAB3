'use strict';

(function () {
    var main = angular.module('main');

    main.controller('LoginController', function LoginController(StorageService, UserService, $state) {
       var loginCtrl = this;

       loginCtrl.subscribe = false;

       loginCtrl.login = function login() {
           if(isDataValid()) {
               UserService.getCurrentUser(loginCtrl.userName, loginCtrl.password).then(function success(response) {
                   if(!response.userName) {
                       StorageService.showToast('UserName e/ou senha inválido(s)');
                   } else {
                       UserService.callBack(false);
                       $state.go('app.home');
                   }
               }, function error(response) {
                   StorageService.showToast(response.data.msg);
               });
           } else {
               StorageService.showToast('Preencha os dados corretamente');
           }
       };

       loginCtrl.subscribeUser = function subscribeUser() {
           if(isDataValid()) {
               UserService.subscribe({userName: loginCtrl.userName, password: loginCtrl.password}).then(function success(response) {
                   $state.go('app.home');
               }, function error(response) {
                   StorageService.showToast(response.msg);
               });
           } else {
               StorageService.showToast('Preencha os dados corretamente');
           }
       };

       loginCtrl.changeAction = function changeAction() {
           loginCtrl.subscribe = ! loginCtrl.subscribe;
       };

       function isDataValid() {
           if(!loginCtrl.userName || !loginCtrl.password) {
               return false;
           }
           return true;
       }
    });
})();