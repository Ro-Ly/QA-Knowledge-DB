package com.roly.qakb.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class Question {
    private String id;
    private String title;
    private List<String> tags;
    private String answer;
    private String category;
    private String subcategory;
}