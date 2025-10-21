FROM eclipse-temurin:21-jdk-alpine
WORKDIR /usr/src/backend
COPY pom.xml ./
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests
EXPOSE 8000
CMD ["java", "-jar", "target/my-springboot-app-0.0.1-SNAPSHOT.jar"]
