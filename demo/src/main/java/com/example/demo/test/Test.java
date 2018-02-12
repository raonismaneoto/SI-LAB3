package com.example.demo.test;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Test {

    public Test () {}

    @RequestMapping(method=RequestMethod.GET, value="/hello", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Test> test() {

        return new ResponseEntity<>(new Test(), HttpStatus.OK);
    }
}
