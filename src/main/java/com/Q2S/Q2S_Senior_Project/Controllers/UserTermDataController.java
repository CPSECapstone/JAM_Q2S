package com.Q2S.Q2S_Senior_Project.Controllers;

import com.Q2S.Q2S_Senior_Project.Models.UserTermDataModel;
import com.Q2S.Q2S_Senior_Project.Repositories.UserTermDataRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Service
@RestController
public class UserTermDataController {

    @Autowired
    private UserTermDataRepo userTermDataRepo;

    @PostMapping("/api/UserTermData")
    public UserTermDataModel saveFlowchartTemplate(@Validated @RequestBody UserTermDataModel flowchartTemplate) {
        return userTermDataRepo.save(flowchartTemplate);
    }

    @GetMapping("/api/UserTermData/{id}")
    UserTermDataModel getFlowchartTemplateById(@PathVariable long id) {
        return userTermDataRepo.findById(id).orElse(null);
    }

    @GetMapping("/api/UserTermData")
    List<UserTermDataModel> getAllUserTermData() {
        return userTermDataRepo.findAll();
    }

    @DeleteMapping("/api/UserTermData/{id}")
    void deleteUserTermDataById(@PathVariable long id){
        userTermDataRepo.deleteById(id);
    }
}
