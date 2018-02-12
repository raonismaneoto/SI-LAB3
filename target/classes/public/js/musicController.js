'use strict';

(function() {
    var app = angular.module("main");

    app.controller("MusicController", function MusicController($state, StorageService, $mdDialog,
                                                               AlbumService, MusicService, ArtistService, $q, UserService, PlayListService) {
        var musicCtrl = this;

        musicCtrl.user = UserService.currentUser;
        musicCtrl.musics = [];

        function getUser () {
            if(!musicCtrl.user.userName) {
                UserService.getLastUser().then(function success(response) {
                    musicCtrl.user = new User(response);
                })
            }
        }

        getUser();

        musicCtrl.addMusic = function addMusic(ev) {
            var music = createMusic();
            if(music.isValid()) {
                var album;
                AlbumService.getAlbum(music.album).then(function success(response) {
                    album = response;
                    var promise;
                    var noDialog = true;
                    if(album.name) {
                        promise = musicCtrl.showConfirmDialog(ev);
                        noDialog = false;
                    }
                    if(!thereIsEqualMusic(album, music)) {
                        if (noDialog || promise) {
                            console.log("tchau");
                            if (!album || _.isEmpty(album) || !album.name) {
                                AlbumService.addAlbum(new Album(
                                    {
                                        name: musicCtrl.album,
                                        musics: []
                                    })).then(function success(response) {
                                    album = response;
                                    var artist;
                                    ArtistService.getArtist(music.artist).then(function success(response) {
                                        artist = response.data;
                                        album.musics.push(music);
                                        music.artist = artist;
                                        if (!artist || _.isEmpty(artist) || !artist.name) {
                                            artist = createArtist();
                                            console.log(artist);
                                            console.log(musicCtrl.artist);
                                            ArtistService.saveArtist(artist).then(function success(response) {
                                                artist = response.data;
                                                console.log(artist);
                                                music.artist = artist;
                                                MusicService.addMusic(music).then(function success(response) {
                                                    music = response;
                                                    album.musics[_.size(album.musics) - 1] = music;
                                                    AlbumService.updateAlbum(album).then(function success(response) {
                                                        album = response;
                                                        StorageService.showToast('Música adicionada com sucesso');
                                                    });
                                                })
                                            });
                                        } else {
                                            MusicService.addMusic(music).then(function success(response) {
                                                music = response;
                                                AlbumService.updateAlbum(album).then(function success(response) {
                                                    album = response;
                                                    StorageService.showToast('Música adicionada com sucesso');
                                                });
                                            })
                                        }
                                    });
                                });
                            } else {
                                promise.then(function success(response) {
                                    var artist;
                                    ArtistService.getArtist(music.artist).then(function success(response) {
                                        artist = response.data;
                                        album.musics.push(music);
                                        music.artist = artist;
                                        if (!artist || _.isEmpty(artist) || !artist.name) {
                                            artist = createArtist();
                                            ArtistService.saveArtist(artist).then(function success(response) {
                                                artist = response.data;
                                                music.artist = artist;
                                                MusicService.addMusic(music).then(function success(response) {
                                                    music = response;
                                                    album.musics[_.size(album.musics) - 1] = music;
                                                    AlbumService.updateAlbum(album).then(function success(response) {
                                                        album = response;
                                                        StorageService.showToast('Música adicionada com sucesso');
                                                        clearFields();
                                                    });
                                                })
                                            });
                                        } else {
                                            MusicService.addMusic(music).then(function success(response) {
                                                music = response;
                                                album.musics.push(music);
                                                AlbumService.updateAlbum(album).then(function success(response) {
                                                    album = response;
                                                    StorageService.showToast('Música adicionada com sucesso');
                                                    clearFields();
                                                });
                                            })
                                        }
                                    });
                                });
                            }
                        }
                    } else {
                        StorageService.showToast('Música já existente nesse album');
                    }
                });
            } else {
                clearFields();
                StorageService.showToast('Campos obrigatórios não preenchidos corretamente');
            }
        };

        /*musicCtrl.addMusic = function addMusic(ev) {
        	var data = {name: musicCtrl.name, 
        		artist: musicCtrl.artist, 
        		album: musicCtrl.album, 
        		releaseYear: musicCtrl.releaseYear,
        		duration: musicCtrl.duration
        	};
            var music = new Music(data);
            var hasThisArtist = musicCtrl.user.findArtist(music.artist);
            if(!hasThisArtist) {
                var artist = new Artist(
                    {name: musicCtrl.artist, 
                    albuns: [new Album(
                        {name: musicCtrl.album, 
                        musics: [music]
                        })]
                    }
                );
            }
        	if(!music.isValid()) {
        		StorageService.showToast('Campos obrigatórios não preenchidos corretamente');
        	} else {
        		var album = musicCtrl.user.findAlbum(music.album);
        		if (album) {
                    if(!hasThisArtist) {
                        musicCtrl.showConfirmDialog(music, ev, artist);
                    } else {
                        var result = musicCtrl.showConfirmDialog(music, ev);
                        if (result)
                            hasThisArtist.addAlbum(new Album(
                                {name: musicCtrl.album, 
                                musics: [music]
                                })
                            );
                    }
        		} else {
        			musicCtrl.user.addMusic(music);
                    if(!hasThisArtist)
                        musicCtrl.user.addArtist(artist);
                    else
                        hasThisArtist.addAlbum(new Album(
                            {name: musicCtrl.album, 
                            musics: [music]
                            })
                        )
		        	StorageService.showToast('Música adicionada com sucesso');
        		}
        	}
            clearFields();
        };*/

        function createMusic() {
            var data = {name: musicCtrl.name,
                artist: {name: musicCtrl.artist},
                album: musicCtrl.album,
                releaseYear: musicCtrl.releaseYear,
                duration: musicCtrl.duration
            };
            return new Music(data);
        }

        function createArtist() {
            return new Artist(
                {
                    name: musicCtrl.artist
                }
            );
        }

        function thereIsEqualMusic(album, music) {
            if(!_.isEmpty(album.musics)) {
                _.each(album.musics, function(each) {
                    return each.name === music.name;
                });
                return false;
            } else {
                return false;
            }
        }

        function loadMusics() {
            MusicService.getMusics().then(function success(response) {
                musicCtrl.musics = response;
                console.log(musicCtrl.musics);
            })
        }

        musicCtrl.showConfirmDialog = function showConfirmDialog(ev) {
            var deffered = $q.defer();
            var confirm = $mdDialog.confirm()
            .clickOutsideToClose(true)
            .title('Adicionar Música')
            .textContent('Esse álbum já existe, deseja adicionar a música no álbum existente?.')
            .ariaLabel('Adicionar Música')
            .targetEvent(ev)
            .ok('Adicionar')
            .cancel('Cancelar');

            $mdDialog.show(confirm).then(function ok() {
                musicCtrl.result = true;
                deffered.resolve(true);
            }, function cancel() {
                deffered.reject(false);
                StorageService.showToast('Cancelado');
            });
            return deffered.promise;
        };

        musicCtrl.hasMusics = function () {
            return !_.isEmpty(musicCtrl.musics);
        };

        musicCtrl.hasPlayLists = function hasPlayLists() {
            return !_.isEmpty(musicCtrl.user.playLists);
        };

        musicCtrl.availablePlayList = function availablePlayList(music, playList) {
            var answer;
            _.each(playList.musics, function (each) {
                answer = each.name === music.name;
            });
            return answer;
        };

        musicCtrl.addPlayList = function addPlayList(music, playList) {
            playList = new PlayList(playList);
            var result = playList.addMusic(music);
            if(result) {
                PlayListService.addMusic(playList.name, music).then(function success(response) {
                    console.log(response);
                    StorageService.showToast("Música adicionada à " + playList.name + " com sucesso.");
                });
            } else {
                StorageService.showToast("Já tem uma música com esse nome em " + playList.name);
            }
        };

        musicCtrl.removePlayList = function removePlayList(music, playList) {
            playList = new PlayList(playList);
            PlayListService.deleteMusic(playList.name, music.name).then(function success(response) {
                playList.removeMusic(music);
                StorageService.showToast(music.name + " removida de " + playList.name);
            });
        };

        function clearFields() {
            musicCtrl.name = "";
            musicCtrl.artist = "";
            musicCtrl.album = "";
            musicCtrl.releaseYear = "";
            musicCtrl.duration = "";
        }

        loadMusics();
    });
})();