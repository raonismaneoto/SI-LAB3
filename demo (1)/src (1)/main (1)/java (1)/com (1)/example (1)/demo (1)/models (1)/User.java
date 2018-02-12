package com.example.demo.models;



import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name="\"User\"")
public class User {

    @Id
    private String userName;

    @OneToMany
    private List<Artist> artists;
    private String password;
    @OneToMany
    private List<PlayList> playLists;
    @OneToMany
    private List<Artist> favoriteArtists;

    public User() {
        this.artists = new ArrayList<Artist>();
    }

    public User(String userName, String password) {
        this.userName = userName;
        this.password = password;
        this.artists = new ArrayList<Artist>();
        this.playLists = new ArrayList<>();
    }

    public void addArtist(Artist artist) {
        this.artists.add(artist);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User objectUser = (User) o;
        return Objects.equals(getUserName(), objectUser.getUserName()) &&
                Objects.equals(getPassword(), objectUser.getPassword());
    }

    public List<Artist> getArtists() {
        return artists;
    }

    public void setArtists(List<Artist> artists) {
        this.artists = artists;
    }

    @Override
    public int hashCode() {

        return Objects.hash(getUserName(), getPassword());
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<PlayList> getPlayLists() {
        return playLists;
    }

    public void setPlayLists(List<PlayList> playLists) {
        this.playLists = playLists;
    }

    public List<Artist> getFavoriteArtists() {
        return favoriteArtists;
    }

    public void setFavoriteArtists(List<Artist> favoriteArtists) {
        this.favoriteArtists = favoriteArtists;
    }
}