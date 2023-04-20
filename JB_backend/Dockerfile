FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY target/ .
RUN ls
EXPOSE 9001
ENTRYPOINT ["java","-jar","Backend-0.0.1-SNAPSHOT.jar"]