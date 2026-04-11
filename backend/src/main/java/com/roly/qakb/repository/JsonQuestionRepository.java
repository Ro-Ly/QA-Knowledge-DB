package com.roly.qakb.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.roly.qakb.model.Question;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Repository;

import java.io.InputStream;
import java.util.List;

@Repository
public class JsonQuestionRepository {

    private final ObjectMapper objectMapper;

    public JsonQuestionRepository(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public List<Question> findAll() {
        try (InputStream inputStream = new ClassPathResource("data/all-questions.json").getInputStream()) {
            return objectMapper.readValue(inputStream, new TypeReference<List<Question>>() {});
        } catch (Exception e) {
            throw new RuntimeException("Failed to read questions from JSON", e);
        }
    }
}