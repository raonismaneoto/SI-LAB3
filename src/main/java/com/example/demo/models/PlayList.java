package com.example.demo.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class PlayList {

    @Id
    private String name;
    @OneToMany
    private List<Music> musics;

    public PlayList(){}

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

    public PlayList(String name) {
        this.name = name;
        this.musics = new ArrayList<>();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PlayList)) return false;
        PlayList playList = (PlayList) o;
        return Objects.equals(getName(), playList.getName()) &&
                Objects.equals(getMusics(), playList.getMusics());
    }

    @Override
    public int hashCode() {

        return Objects.hash(getName(), getMusics());
    }
}
