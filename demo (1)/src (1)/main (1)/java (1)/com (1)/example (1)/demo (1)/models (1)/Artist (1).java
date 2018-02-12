package com.example.demo.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class Artist {

    @Id
    private String name;
    private String image;
    private String lastMusicListenned;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Artist)) return false;
        Artist artist = (Artist) o;
        return Objects.equals(getName(), artist.getName()) &&
                Objects.equals(getImage(), artist.getImage()) &&
                Objects.equals(getLastMusicListenned(), artist.getLastMusicListenned());
    }

    @Override
    public int hashCode() {

        return Objects.hash(getName(), getImage(), getLastMusicListenned());
    }


    public Artist(String name, String image, String lastMusic) {
        this.name = name;
        this.image = image;
        this.lastMusicListenned = lastMusic;
    }

    public Artist () {}

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }


    public void setImage(String image) {
        this.image = image;
    }

    public String getImage() {
        return image;
    }

    public void setLastMusicListenned(String lastMusicListenned) {
        this.lastMusicListenned = lastMusicListenned;
    }

    public String getLastMusicListenned() {
        return lastMusicListenned;
    }


}
