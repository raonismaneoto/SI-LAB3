package com.example.demo.dataBaseOperations;

import com.example.demo.Repositories.*;
import com.example.demo.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataBaseOperations {

    @Autowired
    private ArtistRepository artistRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MusicRepository musicRepository;

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private PlayListRepository playListRepository;

    private static DataBaseOperations dataBaseOperations;

    private DataBaseOperations() {}

    public static DataBaseOperations getDataBaseOperations() {

        if (dataBaseOperations == null) {
            dataBaseOperations = new DataBaseOperations();
        }

        return dataBaseOperations;
    }

    public Artist saveArtist(Artist artist) {
        return artistRepository.save(artist);
    }

    public List<Artist> getArtists() {
        return artistRepository.findAll();
    }

    public User getUser(String userName) {
        return userRepository.findOne(userName);
    }

    public User saveUser (User userToSave) {
        return userRepository.save(userToSave);
    }

    public Music getMusic(String musicName) {
        return musicRepository.findOne(musicName);
    }

    public List<Music> getMusics() {
        return musicRepository.findAll();
    }

    public Music saveMusic(Music music) {
        return musicRepository.save(music);
    }

    public Album getAlbum(String albumName) {
        return albumRepository.findOne(albumName);
    }

    public List<Album> getAlbuns() {
        return albumRepository.findAll();
    }

    public Album saveAlbum(Album album) {
        return albumRepository.save(album);
    }

    public Artist getArtist(String artistName) {
       return artistRepository.findOne(artistName);
    }

    public void removePlayList(String playListName) {
        playListRepository.delete(playListName);
    }

    public PlayList getPlayList(String playListName) {
        return playListRepository.findOne(playListName);
    }

    public void removeMusic(String musicName) {
        musicRepository.delete(musicName);
    }

    public PlayList savePlayList(PlayList pl) {
        return playListRepository.save(pl);
    }
}
