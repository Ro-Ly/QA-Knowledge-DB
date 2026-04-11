package com.roly.qakb.service;

import com.roly.qakb.model.Question;
import com.roly.qakb.repository.JsonQuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    private final JsonQuestionRepository repository;

    public QuestionService(JsonQuestionRepository repository) {
        this.repository = repository;
    }

    public List<Question> getAllQuestions(String category, String tag) {
        return repository.findAll().stream()
                .filter(q -> category == null || category.equalsIgnoreCase(q.getCategory()))
                .filter(q -> tag == null || (q.getTags() != null &&
                        q.getTags().stream().anyMatch(t -> t.equalsIgnoreCase(tag))))
                .collect(Collectors.toList());
    }

    public Question getById(String id) {
        return repository.findAll().stream()
                .filter(q -> id.equals(q.getId()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Question not found: " + id));
    }

    public Set<String> getCategories() {
        return repository.findAll().stream()
                .map(Question::getCategory)
                .filter(c -> c != null && !c.isBlank())
                .collect(Collectors.toSet());
    }
}