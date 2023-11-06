# syntax=docker/dockerfile:1

FROM gradle AS build
WORKDIR /app
COPY . .
RUN gradle clean build -x test

FROM eclipse-temurin:17-jdk-alpine
COPY --from=build /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]