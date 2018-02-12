package com.example.demo.controllers;

import com.example.demo.dataBaseOperations.DataBaseOperations;
import com.example.demo.models.Music;
import com.example.demo.models.PlayList;
import com.example.demo.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PlayListController {

    @Autowired
    private DataBaseOperations dataBaseOperations;

    @RequestMapping(method= RequestMethod.DELETE, value="/playlist/{userName}/{playListName}")
    public ResponseEntity<User> deletePlayList(@PathVariable String userName, @PathVariable String playListName) {
        User user = dataBaseOperations.getUser(userName);
        for(PlayList pl : user.getPlayLists()) {
            if(pl.getName().equals(playListName)) {
                user.getPlayLists().remove(pl);
                break;
            }
        }
        dataBaseOperations.removePlayList(playListName);
        User userToReturn = dataBaseOperations.saveUser(user);
        return new ResponseEntity<>(userToReturn, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.DELETE, value="/playlist/{playListName}/music/{musicName}")
    public ResponseEntity<PlayList> deleteMusic(@PathVariable String playListName, @PathVariable String musicName) {
        PlayList pl = dataBaseOperations.getPlayList(playListName);
        Music music = dataBaseOperations.getMusic(musicName);
        pl.getMusics().remove(music);
        PlayList plToReturn = dataBaseOperations.savePlayList(pl);
        return new ResponseEntity<>(plToReturn, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value="/playlist/{userName}")
    public ResponseEntity<PlayList> addPlayList(@RequestBody PlayList pl, @PathVariable String userName) {
        PlayList plToReturn = dataBaseOperations.savePlayList(pl);
        User user = dataBaseOperations.getUser(userName);
        user.getPlayLists().add(plToReturn);
        dataBaseOperations.saveUser(user);
        return new ResponseEntity<>(plToReturn, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value="/playlist/{playListName}/music")
    public ResponseEntity<PlayList> addMusic(@RequestBody Music music, @PathVariable String playListName) {
        PlayList pl = dataBaseOperations.getPlayList(playListName);
        pl.getMusics().add(music);
        PlayList plToReturn = dataBaseOperations.savePlayList(pl);
        return new ResponseEntity<>(plToReturn, HttpStatus.OK);
    }
}
