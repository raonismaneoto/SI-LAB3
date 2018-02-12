package com.example.demo.controllers;

import com.example.demo.dataBaseOperations.DataBaseOperations;
import com.example.demo.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private DataBaseOperations dataBaseOperations;

    private User lastUser;

    @RequestMapping(method= RequestMethod.GET, value="/user", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> getUser(@RequestParam("userName") String userName,
                                        @RequestParam("password") String password) {
        User requestUser = dataBaseOperations.getUser(userName);
        if(requestUser != null && requestUser.getPassword().equals(password)) {
            lastUser = requestUser;
            return new ResponseEntity<>(requestUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new User(), HttpStatus.OK);
        }
    }

    @RequestMapping(method= RequestMethod.GET, value="/lastuser", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> getLastUser() {
        if(lastUser != null) {
            lastUser = dataBaseOperations.getUser(lastUser.getUserName());
            return new ResponseEntity<>(lastUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new User(), HttpStatus.OK);
        }
    }

    @RequestMapping(method= RequestMethod.POST, value="/user", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> post(@RequestBody User requestUser) {
        User savedUser = dataBaseOperations.saveUser(requestUser);
        return new ResponseEntity<>(savedUser, HttpStatus.OK);
    }

    @RequestMapping(method= RequestMethod.PUT, value="/user/logout", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity put() {
        this.lastUser = null;
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
