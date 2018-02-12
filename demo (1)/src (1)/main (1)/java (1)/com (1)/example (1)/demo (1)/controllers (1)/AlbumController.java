package com.example.demo.controllers;

import com.example.demo.dataBaseOperations.DataBaseOperations;
import com.example.demo.models.Album;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AlbumController {

    @Autowired
    private DataBaseOperations dataBaseOperations;

    @RequestMapping(method= RequestMethod.GET, value="/album", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Album> getAlbum(@RequestParam("name") String albumName) {
        Album album = dataBaseOperations.getAlbum(albumName);
        if(album != null)
            return new ResponseEntity<>(album, HttpStatus.OK);
        return new ResponseEntity<>(new Album(), HttpStatus.OK);
    }

    @RequestMapping(method= RequestMethod.GET, value="/albuns", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Album>> getAlbuns() {
        List<Album> albuns = dataBaseOperations.getAlbuns();
        return new ResponseEntity<>(albuns, HttpStatus.OK);
    }

    @RequestMapping(method= RequestMethod.POST, value="/album", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Album> saveAlbum(@RequestBody Album album) {
        Album returnAlbum = dataBaseOperations.saveAlbum(album);
        return new ResponseEntity<>(returnAlbum, HttpStatus.OK);
    }

    @RequestMapping(method= RequestMethod.PUT, value="/album", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Album> updateAlbum(@RequestBody Album album) {
        System.out.println(album);
        Album returnAlbum = dataBaseOperations.saveAlbum(album);
        return new ResponseEntity<>(returnAlbum, HttpStatus.OK);
    }

}
