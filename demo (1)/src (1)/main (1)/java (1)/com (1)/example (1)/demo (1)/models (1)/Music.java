package com.example.demo.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import java.util.Objects;

@Entity
public class Music {

    @Id
    private String name;
    @OneToOne
    private Artist artist;
    private int releaseYear;
    private double duration;
    private String album;

    public Music () {}

    public Music (String name, Artist artist, int releaseYear, double duration, String album) {
        this.name = name;
        this.artist = artist;
        this.releaseYear = releaseYear;
        this.duration = duration;
        this.album = album;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }

    public Artist getArtist() {
        return artist;
    }

    @Override
    public String toString() {
        return "Music{" +
                "name='" + name + '\'' +
                ", artist=" + artist +
                ", releaseYear=" + releaseYear +
                ", duration=" + duration +
                ", album=" + album +
                '}';
    }

    public void setArtist(Artist artist) {
        this.artist = artist;
    }

    public double getDuration() {
        return duration;
    }

    public void setDuration(double duration) {
        this.duration = duration;
    }

    public String getAlbum() {
        return album;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Music)) return false;
        Music music = (Music) o;
        return getReleaseYear() == music.getReleaseYear() &&
                Double.compare(music.getDuration(), getDuration()) == 0 &&
                Objects.equals(getName(), music.getName()) &&
                Objects.equals(getArtist(), music.getArtist()) &&
                Objects.equals(getAlbum(), music.getAlbum());
    }

    @Override
    public int hashCode() {

        return Objects.hash(getName(), getArtist(), getReleaseYear(), getDuration(), getAlbum());
    }
}
