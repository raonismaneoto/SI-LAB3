'use strict';

(function () {
    var main = angular.module('main');

    main.service('PlayListService', function PlayListService($q, $http, UserService) {
       var service = this;

       service.addPlayList = function addPlayList(playList) {
           var deffered = $q.defer();
           $http.post('/playlist/' + UserService.currentUser.userName, playList).then(function success(response) {
               deffered.resolve(response.data);
           });
           return deffered.promise;
       };

        service.addMusic = function addMusic(playListName, music) {
            var deffered = $q.defer();
            $http.post('/playlist/' + playListName + '/music', music).then(function success(response) {
                deffered.resolve(response.data);
            });
            return deffered.promise;
        };

       service.deleteMusic = function deleteMusic(playListName, musicName) {
           var deffered = $q.defer();
           $http.delete('/playlist/' + playListName + '/music/' + musicName).then(function success(response) {
               deffered.resolve(response.data);
           });
           return deffered.promise;
       };

       service.deletePlayList = function deletePlayList(playListName) {
           var deffered = $q.defer();
           $http.delete('/playlist/' + UserService.currentUser.userName + '/' + playListName).then(function success(response) {
               deffered.resolve(response.data);
           });
           return deffered.promise;
       }
    });
})();