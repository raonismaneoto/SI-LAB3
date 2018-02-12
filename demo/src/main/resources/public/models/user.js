"use strict";

function User(data) {
    _.extend(this, data);
    if(!this.artists)
	    this.artists = [];
    if(!this.favoriteArtists || _.isEmpty(this.favoriteArtists))
	    this.favoriteArtists = [];
    if(!this.playLists)
        this.playLists = [];
}

User.prototype.addArtist = function addArtist(artistToAdd) {
	this.artists.push(artistToAdd);
};

User.prototype.addPlayList = function addPlayList(playList) {
	var thereIsTheSamePl = _.find(this.playLists, playList);
	var hasOneWithTheSameName;
	_.each(this.playLists, function (pl) {
	   if(pl.name === playList.name) {
	       hasOneWithTheSameName = true;
       }
    });
	if(thereIsTheSamePl || hasOneWithTheSameName) {
		return false;
	} else {
		this.playLists.push(playList);
		return true;
	}
};

User.prototype.removePlayList = function removePlayList(playList) {
	_.remove(this.playLists, playList);
};

User.prototype.addMusic = function addMusic(music) {
	var album = this.findAlbum(music.album)
	if (album) {
		var worked = album.addMusic(music);
		return worked;
	} else {
		var data = {name: music.album, musics: [music]};
		var newAlbum = new Album(data);
		this.albuns.push(newAlbum);
	}
};

User.prototype.findAlbum = function findAlbum(name) {
	var album = _.find(this.albuns, function(currentAlbum) {
		return currentAlbum.name === name;
	});
	return album;
};

User.prototype.findArtist = function findArtist(name) {
	var artist = _.find(this.artists, function(currentArtist) {
		return currentArtist.name === name;
	});
	return artist;
};

User.prototype.addFavorite = function addFavorite(artist) {
	if(!this.checkIfIsAFavorite(artist)) {
		this.favoriteArtists.push(artist);
	}
};

User.prototype.checkIfIsAFavorite = function (artist) {
	var answer;
	_.each(this.favoriteArtists, function (each) {
		answer = each.name === artist.name;
	});
	return answer;
};

User.prototype.removeFavorite = function removeFavorite(artist) {
	_.remove(this.favoriteArtists, function(currentArtist) {
		return currentArtist.name === artist.name;
	});
};