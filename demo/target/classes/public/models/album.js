"use strict";

function Album(data) {
	_.extend(this, data);
}

Album.prototype.addMusic = function addMusic(musicToAdd) {
	var music = _.find(this.musics, function(currentMusic) {
		return currentMusic.name === musicToAdd.name;
	});
	if (music) {
		return false;
	} else {
		this.musics.push(musicToAdd);
		return true;
	}
};