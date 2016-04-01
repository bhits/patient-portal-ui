FROM java:8
VOLUME /java
ARG finalName
ADD $finalName /pp-ui.jar
ENTRYPOINT ["java","-Djavax.net.ssl.trustStore=/java/keystore/mhc.keystore","-Djavax.net.ssl.trustStorePassword=changeit","-jar","/pp-ui.jar","--spring.profiles.active=docker"]
