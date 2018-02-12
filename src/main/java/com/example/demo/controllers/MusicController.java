package com.example.demo.controllers;


import com.example.demo.dataBaseOperations.DataBaseOperations;
import com.example.demo.models.Music;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MusicController {

    @Autowired
    private DataBaseOperations dataBaseOperations;

    @RequestMapping(method= RequestMethod.GET, value="/music", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Music> getMusic(@RequestParam("name") String musicName) {
        Music music = dataBaseOperations.getMusic(musicName);
        if(music != null)
            return new ResponseEntity<>(music, HttpStatus.OK);
        return new ResponseEntity<>(new Music(), HttpStatus.OK);
    }

    @RequestMapping(method= RequestMethod.GET, value="/musics", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Music>> getMusics() {
        List<Music> musics = dataBaseOperations.getMusics();
        return new ResponseEntity<>(musics, HttpStatus.OK);
    }

    @RequestMapping(method= RequestMethod.POST, value="/music", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Music> addMusic(@RequestBody Music music) {
        Music returnMusic = dataBaseOperations.saveMusic(music);
        return new ResponseEntity<>(returnMusic, HttpStatus.OK);
    }
}
