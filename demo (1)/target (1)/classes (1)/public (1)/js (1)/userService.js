'use strict';

(function () {
    var main = angular.module('main');

    main.service('UserService', function UserService($q, $http) {
       var service = this;
       service.currentUser = new User();
       service.loading = true;

       service.getCurrentUser = function getCurrentUser(userName, password) {
           var deffered = $q.defer();
           $http.get('/user?userName=' + userName + "&password=" + password).then(function success(response) {
               service.currentUser = new User(response.data);
               deffered.resolve(response.data);
           }, function error (response) {
                deffered.reject(response.data);
           });
           return deffered.promise;
       };


        service.subscribe = function getCurrentUser(user) {
            var deffered = $q.defer();
            $http.post('/user', user).then(function success(response) {
                service.currentUser = new User(response.data);
                deffered.resolve(response.data);
                service.callBack(false);
            }, function error (response) {
                deffered.reject(response.data);
            });
            return deffered.promise;
        };

        service.getLastUser = function getLastUser() {
            var deffered = $q.defer();
            $http.get('/lastuser').then(function success(response) {
               deffered.resolve(response.data);
            });
            return deffered.promise;
        };

        service.logout = function logout() {
          var deffered = $q.defer();
          $http.put('/user/logout').then(function success(response) {
             service.currentUser = new User();
             deffered.resolve(response);
          });
          return deffered.promise;
        };

        service.getLastUser();
    });
})();