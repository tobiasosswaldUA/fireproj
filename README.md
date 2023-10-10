# Installation

We will use the provided docker-compose-dev.yml and package.json files to configure the necessary dependencies and build the project.

## Prerequisites

Before getting started, ensure that you have the following prerequisites installed on your machine:

- Docker
- Node.js

1. Clone the Repository
   First, clone the repository containing the "firesmoke" project to your local machine.
2. Install Dependencies
   Navigate to the project directory and run the following command to install the project dependencies specified in the package.json file:
   `npm install`
3. Configure Docker Compose
   Open the docker-compose-dev.yml file and make sure the version is set to "3". This file defines the services and volumes required for the development environment.
4. Build the Docker Image
   To build the Docker image for the "firesmoke" service, run the following command in the project directory:
   `docker-compose -f docker-compose-dev.yml build`
5. Start the Development Environment
   To start the development environment, run the following command:
   `docker-compose -f docker-compose-dev.yml up`

This command will start the "firesmoke" service and mount the project directory as a volume inside the Docker container. It will also map port 3010 on your local machine to port 3000 inside the container.

6. Access the Application
   Once the development environment is up and running, you can access the "firesmoke" application by opening your web browser and navigating to http://localhost:3010.

# Internationalization (Languages)

The language system in the "firesmoke" project works by determining the preferred language of the user and displaying the content accordingly.
Currently only Portuguese and English work with English being the fallback. Meaning every other language that is not present will default to English.

There are three important files:

1. middleware.ts:

- The getLocale function retrieves the preferred locale from the request headers using the accept-language header.
- The middleware function checks if the pathname of the request URL contains a supported locale. If not, it redirects the user to the same URL with the preferred locale added.
- The config object specifies the paths on which the middleware should run. In this case, it skips internal paths and can be optionally configured to only run on the root URL.

2. layout.tsx:

- The LocaleLayout component is the layout component used for rendering pages in different languages.
- The lang parameter is passed to the component to determine the current language.
- The getMessages function dynamically imports the JSON file containing the messages for the specified language. If the file is not found, it triggers a "not found" response.
- The generateMetadata function generates metadata for the page, including the title, based on the current language.
- The NextIntlClientProvider component wraps the content and provides the locale and messages for localization.
- The lang parameter is used to set the lang attribute of the HTML element, indicating the current language.

3. translations file (pt.json, en.json):

- Each file in that folder contains the messages for the language specified in the name.
- The messages are organized into different sections, such as "Index" and "Methodology".
- Each section contains key-value pairs representing the message keys and their corresponding translations.
- The translations can include HTML tags for formatting purposes.

## Adding a new language

To add a new language based on the provided files, follow these step-by-step instructions:

1. Identify the new language you want to add. Let's assume the new language is "es" for Spanish.

2. Update the locales array in middleware.ts to include the new language code. For example:
   `let locales = ["en", "pt", "es"];`

3. Create a new JSON file for the new language in the messages directory. For example, create a file named es.json.

4. Populate the new JSON file with the translations for the new language. You can use the existing JSON files (en.json and pt.json) as a reference and translate the messages accordingly.

# TODO

how to add links to subnav
add legend to sidebar
add link to smoke smokestorm.web.ua.pt
