"use strict";

function PlayList(data) {
	_.extend(this, data);
	if(!this.musics)
		this.musics = [];
}

PlayList.prototype.addMusic = function addMusic(music) {
	var thereIsMusic = _.find(this.musics, music);
	if(thereIsMusic) {
		return false;
	} else {
		this.musics.push(music);
		return true;
	}
};

PlayList.prototype.removeMusic = function removeMusic(music) {
	_.remove(this.musics, music);
};