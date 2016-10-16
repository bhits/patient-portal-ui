# Short Description
The Patient Portal UI is used by the patient to manage his or her health information and consent.

# Full Description

# Supported Tags and Respective `Dockerfile` Links

[`1.16.0`](https://github.com/bhits/patient-portal-ui/blob/master/patient-portal-ui/src/main/docker/Dockerfile),[`latest`](https://github.com/bhits/patient-portal-ui/blob/master/patient-portal-ui/src/main/docker/Dockerfile)[(1.16.0/Dockerfile)](https://github.com/bhits/patient-portal-ui/blob/master/patient-portal-ui/src/main/docker/Dockerfile)

For more information about this image, the source code, and its history, please see the [GitHub repository](https://github.com/bhits/patient-portal-ui).

# What is Patient Portal UI?

The Patient Portal UI (patient-portal-ui) is a patient user interface component of Consent2Share used by the patient to manage his or her health information and consent. Patients can use this application to register, log in, visit their home page, review their health records, conduct consent management activities, and view prior consent decisions.

For more information and related downloads for Consent2Share, please visit [Consent2Share](https://bhits.github.io/consent2share/).

# How to use this image


## Start a patient-portal-ui instance

Be sure to familiarize yourself with the repository's [README.md](https://github.com/bhits/patient-portal-ui) file before starting the instance.

`docker run  --name patient-portal-ui -d bhits/pp-ui:latest <additional program arguments>`

*NOTE: In order for this API to fully function as a microservice in the Consent2Share application, it is required to setup the dependency microservices and support level infrastructure. Please refer to the [Consent2Share Deployment Guide]() for instructions to setup the Consent2Share infrastructure.*


## Configure

This API runs with a [default configuration](https://github.com/bhits/patient-portal-ui/blob/master/patient-portal-ui/src/main/resources/application.yml) that is primarily targeted for the development environment.  The Spring profile `docker` is actived by default when building images. [Spring Boot](https://projects.spring.io/spring-boot/) supports several methods to override the default configuration to configure the API for a certain deployment environment. 

Here is example to override default database password:

`docker run -d bhits/pp-ui:latest --spring.datasource.password=strongpassword`

## Using a custom configuration file

To use custom `application.yml`, mount the file to the docker host and set the environment variable `spring.config.location`.

`docker run -v "/path/on/dockerhost/C2S_PROPS/patient-portal-ui/application.yml:/java/C2S_PROPS/patient-portal-ui/application.yml" -d bhits/pp-ui:tag --spring.config.location="file:/java/C2S_PROPS/patient-portal-ui/"`

## Environment Variables

When you start the Patient Portal UI image, you can edit the configuration of the Patient Portal UI instance by passing one or more environment variables on the command line. 

### JAR_FILE
This environment variable is used to setup which jar file will run. you need mount the jar file to the root of container.

`docker run --name patient-portal-ui -e JAR_FILE="patient-portal-ui-latest.jar" -v "/path/on/dockerhost/patient-portal-ui-latest.jar:/patient-portal-ui-latest.jar" -d bhits/pp-ui:latest`

### JAVA_OPTS 
This environment variable is used to setup JVM argument, such as memory configuration.

`docker run --name patient-portal-ui -e "JAVA_OPTS=-Xms512m -Xmx700m -Xss1m" -d bhits/pp-ui:latest`

### DEFAULT_PROGRAM_ARGS 
This environment variable is used to setup application arugument. The default value of is "--spring.profiles.active=docker".

`docker run --name patient-portal-ui -e DEFAULT_PROGRAM_ARGS="--spring.profiles.active=ssl,docker" -d bhits/pp-ui:latest`

# Supported Docker versions
This image is officially supported on Docker version 1.12.1.

Support for older versions (down to 1.6) is provided on a best-effort basis.

Please see the [Docker installation documentation](https://docs.docker.com/engine/installation/) for details on how to upgrade your Docker daemon.

# License
View [license]() information for the software contained in this image.

# User Feedback

## Documentation 
Documentation for this image is stored in the [bhits/patient-portal-ui](https://github.com/bhits/patient-portal-ui) GitHub repository. Be sure to familiarize yourself with the repository's README.md file before attempting a pull request.

## Issues

If you have any problems with or questions about this image, please contact us through a [GitHub issue](https://github.com/bhits/patient-portal-ui/issues).