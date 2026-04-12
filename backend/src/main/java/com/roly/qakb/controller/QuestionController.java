package com.roly.qakb.controller;

import com.roly.qakb.model.Question;
import com.roly.qakb.service.QuestionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class QuestionController {

    private final QuestionService service;

    public QuestionController(QuestionService service) {
        this.service = service;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "UP");
    }

    @GetMapping("/questions")
    public List<Question> getQuestions(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String tag
    ) {
        return service.getAllQuestions(category, tag);
    }

    @GetMapping("/questions/{id}")
    public Question getQuestionById(@PathVariable String id) {
        return service.getById(id);
    }

    @GetMapping("/categories")
    public Set<String> getCategories() {
        return service.getCategories();
    }
}