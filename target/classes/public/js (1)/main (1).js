'use strict';

(function() {
    var main = angular.module('main', [
        'ngMaterial',
        'ui.router'
    ]);

    main.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state("app", {
                abstract: true,
                views: {
                    main: {
                        templateUrl: "views/main.html",
                        controller: "MainController as mainCtrl"
                    }
                }
            })
            .state("login", {
                url: "/login",
                views: {
                    login: {
                        templateUrl: "views/login.html",
                        controller: "LoginController as loginCtrl"
                    }
                }
            })
            .state("app.home", {
                url: "/home",
                views: {
                    content: {
                        templateUrl: "views/home.html",
                        controller: "HomeController as homeCtrl"
                    }
                }
            })
            .state("app.newArtist", {
                url: "/new_artist",
                views: {
                    content: {
                        templateUrl: "views/new_artist.html",
                        controller: "ArtistController as artistCtrl"
                    }
                }
            })
            .state("app.artists", {
                url: "/artists",
                views: {
                    content: {
                        templateUrl: "views/artists.html",
                        controller: "ArtistController as artistCtrl"
                    }
                }
            })
            .state("app.newMusic", {
                url: "/new_music",
                views: {
                    content: {
                        templateUrl: "views/new_music.html",
                        controller: "MusicController as musicCtrl"
                    }
                }
            })
            .state("app.musics_details", {
                url: "/musics_details",
                views: {
                    content: {
                        templateUrl: "views/musics.html",
                        controller: "MusicController as musicCtrl"
                    }
                }
            })
            .state("app.search_artist", {
                url: "/search_artist",
                views: {
                    content: {
                        templateUrl: "views/search_artist.html",
                        controller: "ArtistController as artistCtrl"
                    }
                }
            })
            .state("app.new_playList", {
                url: "/new_playList",
                views: {
                    content: {
                        templateUrl: "views/new_playlist.html",
                        controller: "PlayListController as plCtrl"
                    }
                }
            })
            .state("app.playLists", {
                url: "/playLists",
                views: {
                    content: {
                        templateUrl: "views/playLists.html",
                        controller: "PlayListController as plCtrl"
                    }
                }
            });
    });
})();