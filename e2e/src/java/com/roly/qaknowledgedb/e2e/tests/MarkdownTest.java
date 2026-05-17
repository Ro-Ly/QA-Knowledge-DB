// e2e/src/test/java/com/roly/qaknowledgedb/e2e/tests/MarkdownTest.java
package com.roly.qaknowledgedb.e2e.tests;

import com.roly.qaknowledgedb.e2e.BaseTest;
import com.roly.qaknowledgedb.e2e.pages.KnowledgeBasePage;
import org.junit.jupiter.api.Test;

class MarkdownTest extends BaseTest {

    @Test
    void shouldRenderCodeBlocksInsideAnswer() {
        new KnowledgeBasePage(page)
                .open(baseUrl)
                .search("SQL")
                .shouldHaveQuestions()
                .openFirstQuestion()
                .shouldShowCodeBlock();
    }
}