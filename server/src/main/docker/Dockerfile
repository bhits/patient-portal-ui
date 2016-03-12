FROM java:8
ENV server.ssl.key-store /prop/ssl_keystore.keystore
ADD pp-ui-0.8.0-SNAPSHOT.jar /pp-ui.jar
ENTRYPOINT ["java","-jar","/pp-ui.jar"]
