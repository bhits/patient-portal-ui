# Patient Portal UI

The Patient Portal UI (patient-portal-ui) is patient user interface module of the Consent2share (C2S) used by the patient to manage his/her health information. Patients can use this to register, log in, visit their home page, review their health records, conduct consent management activities, and view prior consent decisions.

## Build

### Prerequisites

+ [Oracle Java JDK 8 with Java Cryptography Extension (JCE) Unlimited Strength Jurisdiction Policy](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
+ [Docker Engine](https://docs.docker.com/engine/installation/) (for building a Docker image from the project)
+ [Node.js](https://nodejs.org/en/) (Optional, *see [Structure](#structure) for details*)
+ [Grunt](http://gruntjs.com/getting-started) (Optional, *see [Structure](#structure) for details*)

### Structure

There are two main modules in this project, one folder named client contains all frontend view code, which is client side using Angular framework to build. Another folder named server is server side with Spring Boot, which servers static client content. This is a Maven project and it uses [Frontend maven plugin](https://github.com/eirslett/frontend-maven-plugin). This plugin can locally download node.js and grunt to build client code and then build packing with server side code in a jar. You even do not need to install Node.js and Grunt. But you need to install them if you want to separately build frontend and backend code.

### Commands

This Maven project requires Apache Maven 3.3.3 or greater to build it. It is recommended to use the *Maven Wrapper* scripts provided with this project. *Maven Wrapper* requires internet connection to download Maven and project dependencies for the very first build.

To build the project, navigate to the folder that contains `pom.xml` file using terminal/command line.

+ To build a JAR:
    + For Windows, run `mvnw.cmd clean install`
    + For *nix systems, run `mvnw clean install`
+ To build a Docker Image (this will create an image with `bhits/pp-ui:latest` tag):
    + For Windows, run `mvnw.cmd clean package docker:build`
    + For *nix systems, run `mvnw clean package docker:build`

Note: Frontend developers can build frontend and backend code separately and save building time by skipping the Grunt build as needed.
  
+ To build the frontend code, navigate to the client folder and run: `grunt build:dev`
+ Then navigate to the server folder and run `mvnw.cmd clean install -PskipGrunt`

## Run

### Commands

This is a [Spring Boot](https://projects.spring.io/spring-boot/) project and serves the project via an embedded Tomcat instance, therefore there is no need for a separate application server to run it.

+ Run as a JAR file: `java -jar pp-ui-x.x.x-SNAPSHOT.jar <additional program arguments>`
+ Run as a Docker Container: `docker run -d bhits/pp-ui:latest <additional program arguments>`

*NOTE: In order for this API to fully function as a microservice in C2S Application, it is also required to setup the dependency microservices and support level infrastructure. Please refer to the C2S Deployment Guide for instructions to setup the C2S infrastructure.*

## Configure

### Server Side

The server side is mainly responsible for serving static client content. All configuration of itself is to setup the dependency microservices and support level infrastructure. All configuration of client side is set in grunt file (*See [Client Side](#client-side) for details*).

*NOTE: In order to remove the hashtag from theURL. We enable HTML5 mode instead of Hashbang mode (default mode). But using this mode requires rewriting all the links to entry point of the application on server side. We set to start from `/fe` as the application base.*

In the `PPUIApplication.java`, this can be provided as:
```java
...
  @RequestMapping(value = "/fe/**")
      public String redirect() {
          return "forward:/";
      }
...
```

#### Enable SSL

For simplicity in development and testing environments, SSL is **NOT** enabled by default configuration. SSL can easily be enabled following the examples below:

##### Enable SSL While Running as a JAR

+ `java -jar pp-ui-x.x.x-SNAPSHOT.jar --spring.profiles.active=ssl --server.ssl.key-store=/path/to/ssl_keystore.keystore --server.ssl.key-store-password=strongkeystorepassword`

##### Enable SSL While Running as a Docker Container

+ `docker run -d -v "/path/on/dockerhost/ssl_keystore.keystore:/path/to/ssl_keystore.keystore" bhits/pp-ui:latest --spring.profiles.active=ssl --server.ssl.key-store=/path/to/ssl_keystore.keystore --server.ssl.key-store-password=strongkeystorepassword`
+ In the `docker-compose.yml`, this can be provided as:
```yml
...
  pp-ui.c2s.com:
    image: "bhits/pp-ui:latest"
    command: ["--spring.profiles.active=ssl","--server.ssl.key-store=/path/to/ssl_keystore.keystore", "--server.ssl.key-store-password=strongkeystorepassword"]
    volumes:
      - /path/on/dockerhost/ssl_keystore.keystore:/path/to/ssl_keystore.keystore
...
```

*NOTE: As seen in the examples above, `/path/to/ssl_keystore.keystore` is made available to the container via a volume mounted from the Docker host running this container.*

#### Override Java CA Certificates Store In Docker Environment

Java has a default CA Certificates Store that allows it to trust well-known certificate authorities. For development and testing purposes, one might want to trust additional self-signed certificates. In order to override the default Java CA Certificates Store in docker container, one can mount a custom `cacerts` file over the default one in the docker image as `docker run -d -v "/path/on/dockerhost/to/custom/cacerts:/etc/ssl/certs/java/cacerts" bhits/pp-ui:latest`

*NOTE: The `cacerts` references given in the both sides of volume mapping above are files, not directories.*

### Client Side

This project runs with some default configuration that is primarily targeted for development environment. You can change the default configuration in the grunt file but you need to build the client code after you changed.

Please see the [default configuration](client/gruntfile.js) for this Client Side as a guidance and specific configuration for a new environment as needed.

#### Examples for Changing Configuration in Grunt

In the `gruntfile.js`, this can be provided as:
```js
...
  dev: {
      options: {
          dest: '<%= config_dir %>/config.js'
      },
      constants: {
          envService: {
              name: 'Development',
              version:'<%= pkg.version %>',
              base64BasicKey: 'newvalue',
...
```
*NOTE: The `base64BasicKey` references is used for [UAA](http://docs.cloudfoundry.org/api/uaa/#password-grant) Password Grant type. Its value is encoded with `client_id:client_secret` by base64 format*

[//]: # (## API Documentation)

[//]: # (## Notes)

[//]: # (## Contribute)

## Contact
If you have any questions, comments, or concerns please see [Consent2Share](../../contact) page

## Report Issues
Please use [GitHub Issues](https://github.com/bhits/patient-portal-ui/issues) page to report issues.

[//]: # (License)