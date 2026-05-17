package com.roly.qaknowledgedb.e2e.pages;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import org.assertj.core.api.Assertions;

import java.util.regex.Pattern;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

public class KnowledgeBasePage {

    private final Page page;

    private final Locator searchInput;
    private final Locator questionItems;
    private final Locator questionTitles;
    private final Locator questionAnswers;
    private final Locator emptyState;
    private final Locator codeBlocks;
    private final Locator sectionTitles;

    public KnowledgeBasePage(Page page) {
        this.page = page;

        this.searchInput = page.getByTestId("search-input");
        this.questionItems = page.getByTestId("question-item");
        this.questionTitles = page.getByTestId("question-title");
        this.questionAnswers = page.getByTestId("question-answer");
        this.emptyState = page.getByTestId("empty-state");
        this.codeBlocks = page.locator("pre, pre code");

        this.sectionTitles = page.locator("//h3[contains(@class, 'MuiAccordion-heading')]//h5");
    }

    public KnowledgeBasePage open(String baseUrl) {
        page.navigate(baseUrl);
        return this;
    }

    public KnowledgeBasePage shouldBeOpened() {
        assertThat(page).hasTitle(Pattern.compile(".*QA.*Knowledge.*", Pattern.CASE_INSENSITIVE));
        return this;
    }

    public KnowledgeBasePage shouldHaveSectionTitles() {
        assertThat(sectionTitles.first()).isVisible();
        return this;
    }

    public KnowledgeBasePage shouldHaveSectionTitlesWithText(String text) {
        shouldHaveSectionTitles();
        var searchedSection = sectionTitles.all().stream()
                .filter(e -> e.textContent().contains(text))
                .toList();
        Assertions.assertThat(searchedSection)
                .as("The section with the text: %s".formatted(text))
                .hasSize(1);
        return this;
    }

    public KnowledgeBasePage shouldHaveQuestions() {
        assertThat(questionItems.first()).isVisible();
        return this;
    }

    public KnowledgeBasePage shouldHaveQuestionWithText() {
        assertThat(questionItems.first()).isVisible();
        return this;
    }

    public KnowledgeBasePage search(String query) {
        searchInput.fill(query);
        return this;
    }

    public KnowledgeBasePage shouldShowText(String text) {
        assertThat(page.getByText(Pattern.compile(text, Pattern.CASE_INSENSITIVE)).first()).isVisible();
        return this;
    }

    public KnowledgeBasePage openFirstQuestion() {
        questionItems.first().click();
        return this;
    }

    public KnowledgeBasePage shouldShowAnswer() {
        assertThat(questionAnswers.first()).isVisible();
        return this;
    }

    public KnowledgeBasePage shouldShowEmptyState() {
        assertThat(emptyState).isVisible();
        return this;
    }

    public KnowledgeBasePage shouldShowCodeBlock() {
        assertThat(codeBlocks.first()).isVisible();
        return this;
    }

    public int questionsCount() {
        return questionItems.count();
    }
}