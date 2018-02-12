(function() {
    "use strict";
    var app = angular.module("main");

    app.service("ArtistService", function ArtistService($http, $q) {
        var service = this;

        service.saveArtist = function (artist) {
            var deferred = $q.defer();
            $http({method:'POST', url:'/artist', data: artist}).then(function success(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        };

        service.getArtists = function getArtists() {
            var deferred = $q.defer();
            $http({method:'GET', url:'/artists'}).then(function success(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        };

        service.getArtist = function getArtist(name) {
            var deferred = $q.defer();
            $http.get('/artist?name=' + name).then(function success(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        };
    });
})();