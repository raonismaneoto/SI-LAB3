package com.example.demo.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;
import java.util.Objects;

@Entity
public class Album {

    @Id
    private String name;
    @OneToMany
    private List<Music> musics;

    public Album () {}

    public Album (String name, List<Music> musics) {
        this.name = name;
        this.musics = musics;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Music> getMusics() {
        return musics;
    }

    public void setMusics(List<Music> musics) {
        this.musics = musics;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Album)) return false;
        Album album = (Album) o;
        return Objects.equals(getName(), album.getName()) &&
                Objects.equals(getMusics(), album.getMusics());
    }

    @Override
    public int hashCode() {

        return Objects.hash(getName(), getMusics());
    }
}
