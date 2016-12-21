# Patient Portal UI

The Patient Portal UI (patient-portal-ui) is a patient user interface component of Consent2share (C2S) used by the patient to manage his or her health information and consent. Patients can use this application to register, log in, visit their home page, review their health records, conduct consent management activities, and view prior consent decisions.

## Build

### Prerequisites

+ [Oracle Java JDK 8 with Java Cryptography Extension (JCE) Unlimited Strength Jurisdiction Policy](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
+ [Docker Engine](https://docs.docker.com/engine/installation/) (for building a Docker image from the project)
+ [Node.js](https://nodejs.org/en/) (Optional, *see [Structure](#structure) for details*)
+ [Grunt](http://gruntjs.com/getting-started) (Optional, *see [Structure](#structure) for details*)

### Structure

There are two main modules in this project:

+ `client`: This folder contains all frontend user interface code, which is written using [Angular](https://angularjs.org/) v1.5.
+ `server`: This folder contains a [Spring Boot](http://projects.spring.io/spring-boot/) project, which is primarily responsible for packaging and serving the static resources that are built from the `client` module. This is also an [Apache Maven](https://maven.apache.org/) project and utilizes [Frontend Maven Plugin](https://github.com/eirslett/frontend-maven-plugin) to: 
    1. locally install [Node.js](https://nodejs.org/en/) and the `client` module Node.js dependencies; 
    2. build the `client` module using locally installed [Grunt](http://gruntjs.com/) Node.js package. Finally, it uses [Apache Maven Resources Plugin](https://maven.apache.org/plugins/maven-resources-plugin/) to copy the resources that are built from the `client` module into the `server` module that will be eventually packaged as a build artifact in `jar` format. Therefore, there is no need to install Node.js or Grunt globally if `server` module is built with Maven.

### Commands

This Maven project requires [Apache Maven](https://maven.apache.org/) 3.3.3 or greater to build it. It is recommended to use the *Maven Wrapper* scripts provided with this project. *Maven Wrapper* requires an internet connection to download Maven and project dependencies for the very first build.

To build the project, navigate to the folder that contains `pom.xml` file using terminal/command line.

+ To build a JAR:
    + For Windows, run `mvnw.cmd clean install`
    + For *nix systems, run `mvnw clean install`
+ To build a Docker Image (this will create an image with `bhits/pp-ui:latest` tag):
    + For Windows, run `mvnw.cmd clean package docker:build`
    + For *nix systems, run `mvnw clean package docker:build`

Note: Frontend developers can build `client` and `server` modules separately and save build time by skipping the full Grunt build when not needed. This option requires [Grunt](http://gruntjs.com/) to be installed globally.
  
1. Build the `client` module: *run `grunt build:dist` in the client folder*
2. Start Grunt watch task to monitor the changes in the `client` module: *run `grunt watch` in the client folder*
3. Manually repackage the `jar` file from the `server` module when Grunt watch re-compiles a resource: *run `mvnw.cmd clean install -PskipGrunt` in the server folder*

## Run

### Commands

This is a [Spring Boot](https://projects.spring.io/spring-boot/) project and serves the project via an embedded Tomcat instance. Therefore there is no need for a separate application server to run it.

+ Run as a JAR file: `java -jar pp-ui-x.x.x-SNAPSHOT.jar <additional program arguments>`
+ Run as a Docker Container: `docker run -d bhits/pp-ui:latest <additional program arguments>`

*NOTE: In order for this application to fully function as a microservice in the C2S application, it is also required to setup the dependency microservices and support level infrastructure. Please refer to the [Consent2Share Deployment Guide](https://github.com/bhits/consent2share/releases/download/2.0.0/c2s-deployment-guide.pdf) for instructions to setup the C2S infrastructure.*

## Debug

This project start using [TypeScript](https://www.typescriptlang.org/index.html) to write Angular 2. By default, the `client` module only generate javascript file that has to be translated from TypeScript file in building target. 

In order to debug TypeScript:

1. Start Grunt debug task to debug the TypeScript file in the `client` module: *run `grunt build:debug` in the client folder*
2. Re-run project and start to debug with using either Browser or IDE

*NOTE: The [source maps](https://code.tutsplus.com/tutorials/source-maps-101--net-29173) file is also generated when TypeScript translate into JavaScript, it sets correspondence between lines in the TypeScript code and in the generated JavaScript code.*

## Configure

The `server` module runs with some default configuration that is primarily targeted for development environment. However, [Spring Boot](https://projects.spring.io/spring-boot/) supports several methods to override the default configuration to configure the API for a certain deployment environment.

Please see the [default configuration](server/src/main/resources/application.yml) for this Application as a guidance and override the specific configuration per environment as needed. Also, please refer to [Spring Boot Externalized Configuration](http://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html) documentation to see how Spring Boot applies the order to load the properties and [Spring Boot Common Properties](http://docs.spring.io/spring-boot/docs/current/reference/html/common-application-properties.html) documentation to see the common properties used by Spring Boot.

### Examples for Overriding a Configuration in Spring Boot

### Override a Configuration Using Program Arguments While Running as a JAR:

+ `java -jar pp-ui-x.x.x-SNAPSHOT.jar --c2s.pp-ui.oauth2.client.secret=strongpassword`

*NOTE: The `oauth2.client.client-id` and `oauth2.client.secret` value are used for [User Account and Authentication (UAA) Password Grant type](http://docs.cloudfoundry.org/api/uaa/#password-grant). The configuration uses the format `client_id:client_secret` to be Base 64 encoded. The `client_id` refers to the OAuth2 Client ID assigned to the Patient Portal UI by [UAA](https://docs.cloudfoundry.org/concepts/architecture/uaa.html). C2S uses `patient-portal-ui` as the default `client_id` for this application.*

### Override a Configuration Using Program Arguments While Running as a Docker Container:

+ `docker run -d bhits/pp-ui:latest --c2s.pp-ui.oauth2.client.secret=strongpassword`

+ In a `docker-compose.yml`, this can be provided as:
```yml
version: '2'
services:
...
  pp-ui.c2s.com:
    image: "bhits/pp-ui:latest"
    command: ["--c2s.pp-ui.oauth2.client.secret=strongpassword"]
...
```

*NOTE:*

+ Please note that these additional arguments will be appended to the default `ENTRYPOINT` specified in the `Dockerfile` unless the `ENTRYPOINT` is overridden.
+ The Patient Portal UI uses [HTML5 mode](https://docs.angularjs.org/guide/$location#html5-mode) for the URL format in the browser address bar and it also uses `/fe` as the base for all Angular routes. Therefore, the `server` component forwards all paths that starts with `/fe` to root.
In the `PPUIApplication.java`:

```java
...
  @RequestMapping(value = "/fe/**")
      public String redirect() {
          return "forward:/";
      }
...
```

### Enable SSL

For simplicity in development and testing environments, SSL is **NOT** enabled by default configuration. SSL can easily be enabled following the examples below:

#### Enable SSL While Running as a JAR

+ `java -jar pp-ui-x.x.x-SNAPSHOT.jar --spring.profiles.active=ssl --server.ssl.key-store=/path/to/ssl_keystore.keystore --server.ssl.key-store-password=strongkeystorepassword`

#### Enable SSL While Running as a Docker Container

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

### Override Java CA Certificates Store In Docker Environment

Java has a default CA Certificates Store that allows it to trust well-known certificate authorities. For development and testing purposes, one might want to trust additional self-signed certificates. In order to override the default Java CA Certificates Store in Docker container, one can mount a custom `cacerts` file over the default one in the Docker image as `docker run -d -v "/path/on/dockerhost/to/custom/cacerts:/etc/ssl/certs/java/cacerts" bhits/pp-ui:latest`

*NOTE: The `cacerts` references given regarding volume mapping above are files, not directories.*

[//]: # (## API Documentation)

[//]: # (## Notes)

[//]: # (## Contribute)

## Contact
If you have any questions, comments, or concerns please see [Consent2Share](https://bhits.github.io/consent2share/) project site.

## Report Issues
Please use [GitHub Issues](https://github.com/bhits/patient-portal-ui/issues) page to report issues.

[//]: # (License)
