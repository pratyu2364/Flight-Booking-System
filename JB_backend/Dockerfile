FROM openjdk:17-jdk-alpine
ADD target/Backend-0.0.1-SNAPSHOT.jar jb_backend.jar
EXPOSE 9001
ENTRYPOINT ["java","-jar", "jb_backend.jar"]
