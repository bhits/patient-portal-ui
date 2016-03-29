FROM java:8
VOLUME /java
ARG finalName
ADD $finalName /pp-ui.jar
ENTRYPOINT ["java","-jar","/pp-ui.jar","--spring.profiles.active=docker"]
