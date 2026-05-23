FROM mcr.microsoft.com/playwright/java:v1.48.0-jammy

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn test-compile

CMD ["sh", "-c", "mkdir -p target/allure-results && mvn test"]