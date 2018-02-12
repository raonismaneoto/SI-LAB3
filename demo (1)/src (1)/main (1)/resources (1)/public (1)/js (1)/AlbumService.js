'use strict';

(function () {
    var main = angular.module('main');

    main.service('AlbumService', function AlbumService($q, $http) {
        var service = this;

        service.getAlbum = function getAlbum(albumName) {
            var deffered = $q.defer();
            $http.get('/album?name=' + albumName).then(function success(response) {
                deffered.resolve(response.data);
            }, function error(response) {
                deffered.reject(response.data);
            });
            return deffered.promise;
        };

        service.getAlbuns = function getAlbuns() {
            var deffered = $q.defer();
            $http.get('/albuns').then(function success(response) {
                deffered.resolve(response.data);
            }, function error(response) {
                deffered.reject(response.data);
            });
            return deffered.promise;
        };

        service.updateAlbum = function updateAlbum(album) {
            console.log(album);
            var deffered = $q.defer();
            $http.put('/album', album).then(function success(response) {
                deffered.resolve(response.data);
            }, function error(response) {
                deffered.reject(response.data);
            });
            return deffered.promise;
        };

        service.addAlbum = function addAlbum(album) {
            var deffered = $q.defer();
            $http.post('/album', album).then(function success(response) {
                deffered.resolve(response.data);
            }, function error(response) {
                deffered.reject(response.data);
            });
            return deffered.promise;
        };
    });
})();