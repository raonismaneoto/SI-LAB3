'use strict';

(function() {
    var app = angular.module("main");

    app.controller("MainController", function MainController($state, $mdSidenav, StorageService, UserService) {
        var mainCtrl = this;

        mainCtrl.message = "Musicoteca";

        mainCtrl.sayHello = function sayHello() {
            StorageService.sayHello().then(function success(value) { console.log(value); });
        };

        mainCtrl.newArtist = function newArtist() {
        	$state.go("app.newArtist");
            mainCtrl.message = "Adicionar Artista";
        };

        mainCtrl.goToHome = function goToHome() {
        	$state.go("app.home");
            mainCtrl.message = "Musicoteca";
        };

        mainCtrl.showArtists = function showArtists() {
            $state.go("app.artists");
            mainCtrl.message = "Artistas";
        };

        mainCtrl.addMusic = function addMusic() {
            $state.go("app.newMusic");
            mainCtrl.message = "Adicionar Música";
        };

        mainCtrl.showMusics = function showMusics() {
            $state.go("app.musics_details");
            mainCtrl.message = "Músicas";
        };

        mainCtrl.searchArtist = function searchArtist() {
            $state.go("app.search_artist");
            mainCtrl.message = "Artistas";
        };

        mainCtrl.toggle = function toggle() {
            $mdSidenav('left').toggle();
        };

        mainCtrl.showPlayLists = function showPlayLists() {
            $state.go("app.playLists");
            mainCtrl.message = "PlayLists";
        };

        mainCtrl.addPlayList = function addPlayList() {
            $state.go("app.new_playList");
            mainCtrl.message = "Adicionar PlayList";
        };

        mainCtrl.logout = function logout() {
            UserService.logout().then(function success() {
                UserService.callBack(true);
                $state.go('login');
            });
        };

    });
})();