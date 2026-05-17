package com.roly.qaknowledgedb.e2e.tests;

import com.roly.qaknowledgedb.e2e.BaseTest;
import com.roly.qaknowledgedb.e2e.pages.KnowledgeBasePage;
import org.junit.jupiter.api.Test;

class SmokeTest extends BaseTest {

    @Test
    void shouldOpenKnowledgeBaseAndShowQuestions() {
        new KnowledgeBasePage(page)
                .open(baseUrl)
                .shouldBeOpened()
                .shouldHaveSectionTitlesWithText("ВОПРОСЫ ОТ HR");
    }
}