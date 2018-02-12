'use strict';

(function () {
    var main = angular.module('main');

    main.service('MusicService', function MusicService($q, $http) {
        var service = this;

        service.getMusic = function getMusic(musicName) {
            var deffered = $q.defer();
            $http.get('/music?name=' + musicName).then(function success(response) {
                deffered.resolve(response.data);
            }, function error(response) {
                deffered.reject(response.data);
            });
            return deffered.promise;
        };

        service.getMusics = function getMusics() {
            var deffered = $q.defer();
            $http.get('/musics').then(function success(response) {
                deffered.resolve(response.data);
            }, function error(response) {
                deffered.reject(response.data);
            });
            return deffered.promise;
        };

        service.addMusic = function addMusic(music) {
            console.log(music);
            var deffered = $q.defer();
            $http.post('/music', music).then(function success(response) {
                deffered.resolve(response.data);
            }, function error(response) {
                deffered.reject(response.data);
            });
            return deffered.promise;
        };
    });
})();