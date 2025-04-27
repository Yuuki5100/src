package com.example.jems.controller;

import com.example.jems.entity.User;
import com.example.jems.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/home")
    public List<User> getAllUsers() {
        return userService.findAll();
    }
}
