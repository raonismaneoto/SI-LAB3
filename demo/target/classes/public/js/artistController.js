'use strict';

(function() {
    var app = angular.module("main");

    app.controller("ArtistController", function ArtistController($state, StorageService, $mdDialog, ArtistService, UserService) {
        var artistCtrl = this;

        artistCtrl.user = UserService.currentUser;
        artistCtrl.searchResult = [];
        artistCtrl.disableCheckBox = false;
        artistCtrl.currentFavorite = {};

        _.forEach(artistCtrl.user.artists, function(artist) {
                artistCtrl.currentFavorite[artist.name] = "";
        });

        artistCtrl.isFavorite = function isFavorite(artist) {
            return _.includes(artistCtrl.user.favoriteArtists, artist);
        };

        artistCtrl.loadArtists = function loadArtists() {
            ArtistService.getArtists().then(function success(response) {
              artistCtrl.artists = response.data;
              console.log(artistCtrl.artists);
            }
            , function error (response) {

            });
        };

        artistCtrl.loadArtists();

        artistCtrl.setFavorite = function setFavorite(artist, ev) {
            if(!_.isEmpty(artistCtrl.currentFavorite[artist.name])) {
                artistCtrl.user.addFavorite(artist);
            } else {
                var confirm = $mdDialog.confirm()
                .clickOutsideToClose(true)
                .title('Remover artista dos favoritos')
                .textContent('Você removerá ' + artist.name + "dos favoritos")
                .ariaLabel('Remover artista dos favoritos')
                .targetEvent(ev)
                .ok('Remover')
                .cancel('Cancelar');

                $mdDialog.show(confirm).then(function ok() {
                    artistCtrl.user.removeFavorite(artist);
                    StorageService.showToast("Artista removido da lista de favoritos com sucesso.");
                }, function cancel() {
                    StorageService.showToast('Cancelado');
                });
            }
        };

        artistCtrl.addArtist = function addArtist() {
        	if(artistCtrl.name) {
	        	var data = {name: artistCtrl.name, 
                    image: artistCtrl.image,
                    lastMusicListenned: artistCtrl.lastMusicListenned
                };
	        	var artist = new Artist(data);
	        	var thereIsAnArtistWithSameName = _.find(artistCtrl.user.artists, function(currentArtist) {
	        		return currentArtist.name === artist.name;
	        	});
	        	if(thereIsAnArtistWithSameName) {
	        		StorageService.showToast('Artista já existente no sistema.');
	        	} else {
	        		artistCtrl.saveArtist(artist);
	        	}
        	} else {
        		StorageService.showToast("O nome do artista é obrigatório");
        	}
            artistCtrl.name = "";
            artistCtrl.image = "";
        };

        artistCtrl.saveArtist = function saveArtist(artist) {
            artist.id = 1;
            ArtistService.saveArtist(artist).then(function success (response) {
                artistCtrl.user.addArtist(response.data);
                StorageService.showToast('Artista adicionado com sucesso');
            }, function error () {
                StorageService.showToast('Artista não foi adicionado.');
            });
        };

        artistCtrl.showArtistDetails = function showArtistDetails(artist, ev) {
            $mdDialog.show({
                controller: DialogController,
                controllerAs: "controller",
                templateUrl: 'views/search_dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: {
                    searchResult: [artist],
                    user: artistCtrl.user,
                    showFavorite: false
                }
            });
        };

        artistCtrl.hasArtists = function hasArtists() {
            return !_.isEmpty(artistCtrl.artists);
        };

        artistCtrl.searchArtist = function searchArtist(ev) {
            artistCtrl.searchResult = [];
            _.forEach(artistCtrl.user.artists, function(artist) {
                if(_.includes(_.lowerCase(artist.name), _.lowerCase(artistCtrl.artistToSearch))) {
                    artistCtrl.searchResult.push(artist);
                }
            });
            if(artistCtrl.showSearch()) {
                $mdDialog.show({
                    controller: DialogController,
                    controllerAs: "controller",
                    templateUrl: 'views/search_dialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    locals: {
                        searchResult: artistCtrl.searchResult,
                        user: artistCtrl.user,
                        showFavorite: true
                    }
                });
            } else {
                StorageService.showToast('Nenhum artista encontrado.');
            }
            
        };

        artistCtrl.showSearch = function showSearch() {
            return !_.isEmpty(artistCtrl.searchResult);
        };

        function DialogController(searchResult, user,showFavorite) {
            var dialogCtrl = this;
            dialogCtrl.user = user;
            dialogCtrl.searchResult = searchResult;
            dialogCtrl.currentFavorite = {};
            dialogCtrl.details = {};
            dialogCtrl.showFavorite = showFavorite;

            _.forEach(dialogCtrl.user.artists, function(artist) {
                dialogCtrl.currentFavorite[artist.name] = "";
            });

            dialogCtrl.albuns = {};

            _.forEach(dialogCtrl.user.artists, function(art) {
                dialogCtrl.albuns[art.name] = generateAlbumString(art);
            })

            function generateAlbumString(art) {
                var result = "";
                _.forEach(art.albuns, function(album) {
                    result += album.name + ", "
                });
                return result.slice(0, -2);
            }

            dialogCtrl.isFavorite = function isFavorite(artist) {
                return _.includes(dialogCtrl.user.favoriteArtists, artist);
            };

            dialogCtrl.setFavorite = function setFavorite(artist) {
                if(!_.isEmpty(dialogCtrl.currentFavorite[artist.name])) {
                    dialogCtrl.user.addFavorite(artist);
                } else {
                    dialogCtrl.user.removeFavorite(artist);
                }
            };

            dialogCtrl.showDetails = function showDetails(artist) {
                dialogCtrl.details[artist.name] = !dialogCtrl.details[artist.name];
            };

            dialogCtrl.hasAlbuns = function hasAlbuns(artist) {
                return !_.isEmpty(artist.albuns) && artist.albuns[0] != "";
            };
        }
    });
})();