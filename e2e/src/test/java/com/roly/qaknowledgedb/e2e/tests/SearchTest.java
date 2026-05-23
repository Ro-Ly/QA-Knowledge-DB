// e2e/src/test/java/com/roly/qaknowledgedb/e2e/tests/SearchTest.java
package com.roly.qaknowledgedb.e2e.tests;

import com.roly.qaknowledgedb.e2e.BaseTest;
import com.roly.qaknowledgedb.e2e.pages.KnowledgeBasePage;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class SearchTest extends BaseTest {

    @Disabled
    @Test
    void shouldFindQuestionsBySearchQuery() {
        new KnowledgeBasePage(page)
                .open(baseUrl)
                .search("Java")
                .shouldHaveQuestions()
                .shouldShowText("Java");
    }

    @Test
    void shouldShowEmptyStateForUnknownSearchQuery() {
        KnowledgeBasePage knowledgeBasePage = new KnowledgeBasePage(page)
                .open(baseUrl)
                .search("very_unknown_query_12345");

        assertThat(knowledgeBasePage.questionsCount())
                .as("No questions should be visible for unknown search query")
                .isZero();
    }
}