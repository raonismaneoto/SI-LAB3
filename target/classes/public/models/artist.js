"use strict";

function Artist(data) {
	_.extend(this, data);
	if(!this.image) {
        this.image = "http://www.mapadoslivros.com.br/Content/Images/sem-foto.gif";
    }
}

Artist.prototype.addLastMusicListenned = function addLastMusicListenned(music) {
	this.lastMusicListenned = music;
};

Artist.prototype.addAlbum = function addAlbum(album) {
	if(!_.includes(this.albuns, album)){
		if(!this.albuns)
			this.albuns = [];
		this.albuns.push(album);
	}
};