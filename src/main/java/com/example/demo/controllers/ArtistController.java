package com.example.demo.controllers;


import com.example.demo.dataBaseOperations.DataBaseOperations;
import com.example.demo.models.Artist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ArtistController {

    @Autowired
    private DataBaseOperations dataBaseOperations;

    @RequestMapping(method=RequestMethod.POST, value="/artist", consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Artist> saveArtist(@RequestBody Artist artist) {
        Artist artistSaved = dataBaseOperations.saveArtist(artist);
        return new ResponseEntity<>(artistSaved, HttpStatus.OK);
    }

    @RequestMapping(method=RequestMethod.GET, value="/artists", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Artist>> getArtists() {
        List<Artist> artists = dataBaseOperations.getArtists();
        return new ResponseEntity<>(artists, HttpStatus.OK);
    }

    @RequestMapping(method=RequestMethod.GET, value="/artist", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Artist> getArtist(@RequestParam("name") String artistName) {
        Artist artist = dataBaseOperations.getArtist(artistName);
        return new ResponseEntity<>(artist, HttpStatus.OK);
    }

}
