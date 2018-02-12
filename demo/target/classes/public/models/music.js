"use strict";

function Music(data) {
	_.extend(this, data);
}

Music.prototype.isValid = function isValid() {
	if (!this.album || !this.name || !this.artist || !this.releaseYear || !this.duration) {
		return false;
	}
	return true;
};