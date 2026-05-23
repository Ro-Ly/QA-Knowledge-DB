package com.roly.qaknowledgedb.e2e.tests;

import com.roly.qaknowledgedb.e2e.BaseTest;
import com.roly.qaknowledgedb.e2e.pages.KnowledgeBasePage;
import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import io.qameta.allure.Story;
import org.junit.jupiter.api.Test;

class SmokeTest extends BaseTest {

    @Epic("Frontend")
    @Story("Base smoke test")
    @Feature("Section title basic check")
    @Test
    void shouldOpenKnowledgeBaseAndShowQuestions() {
        new KnowledgeBasePage(page)
                .open(baseUrl)
                .shouldBeOpened()
                .shouldHaveSectionTitlesWithText("ВОПРОСЫ ОТ HR");
    }
}