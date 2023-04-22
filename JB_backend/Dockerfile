FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY target/Backend-0.0.1-SNAPSHOT.jar jb_backend.jar
RUN ls
# RUN cat config/jdbc.yaml
# RUN cat classes/application.yml
EXPOSE 9001
# ENTRYPOINT ["java","-Dspring.profiles.active=dockerembbed,oauth-security","-jar","Backend-0.0.1-SNAPSHOT.jar"]
ENTRYPOINT ["java","-jar", "jb_backend.jar"]
