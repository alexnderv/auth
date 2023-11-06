# syntax=docker/dockerfile:1

FROM gradle AS build
WORKDIR /auth-server
COPY . .
RUN gradle clean build -x test

FROM eclipse-temurin:17-jdk-alpine
COPY --from=build /auth-server/build/libs/*.jar auth-server.jar
ENTRYPOINT ["java", "-jar", "/auth-server.jar"]