package com.roly.qaknowledgedb.e2e;

import com.microsoft.playwright.*;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;

public class BaseTest {
    protected String baseUrl;

    protected Playwright playwright;
    protected Browser browser;
    protected BrowserContext context;

    protected Page page;

    @BeforeEach
    public void setup() {
        baseUrl = System.getProperty(
                "baseUrl",
                "https://ro-ly.github.io/QA-Knowledge-DB/"
        );

        var headless = false;
        var launchOptions = new BrowserType.LaunchOptions()
                .setHeadless(headless)
                .setSlowMo(500);

        playwright = Playwright.create();
        browser = playwright.chromium().launch(launchOptions);
        var contextOptions = new Browser.NewContextOptions()
                .setViewportSize(1600, 900);
        context = browser.newContext(contextOptions);

        page = context.newPage();
    }

    @AfterEach
    public void teardown() {
        if (context != null) context.close();
        if (page != null) page.close();
        if (browser != null) browser.close();
    }
}
