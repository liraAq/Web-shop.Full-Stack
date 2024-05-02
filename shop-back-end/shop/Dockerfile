# Use AdoptOpenJDK 11 as the base image
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the packaged jar file into the container
COPY target/shop_spring-boot-app-0.0.1-SNAPSHOT.jar /app

# Expose the port your application runs on
EXPOSE 4040

# Command to run the application
CMD ["java", "-jar", "shop_spring-boot-app-0.0.1-SNAPSHOT.jar"]
