// e2e/src/test/java/com/roly/qaknowledgedb/e2e/tests/QuestionDetailsTest.java
package com.roly.qaknowledgedb.e2e.tests;

import com.roly.qaknowledgedb.e2e.BaseTest;
import com.roly.qaknowledgedb.e2e.pages.KnowledgeBasePage;
import org.junit.jupiter.api.Test;

class QuestionDetailsTest extends BaseTest {

    @Test
    void shouldExpandQuestionAndShowAnswer() {
        new KnowledgeBasePage(page)
                .open(baseUrl)
                .shouldHaveQuestions()
                .openFirstQuestion()
                .shouldShowAnswer();
    }
}