package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.TestScore;
import com.example.mapper.*;

@RestController
public class SampleController {
    @Autowired
    SampleMapper sampleMapper;

    // @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/")
    public String test() {
        //return "Hello World!";
        List<TestScore> result = sampleMapper.select();
        return result.toString();
    }
}