# Installation

We will use the provided docker-compose-dev.yml and package.json files to configure the necessary dependencies and build the project.

## Prerequisites

There are two ways to run this project locally.

If running with docker, you can only install Docker and Docker-compose

If running with node you only need to install node on your machine. Personally I recommend `nvm` but there are other ways and a google search will help you

One file is not included in the git repository for safety.

In the folder `firesmoke` you need to create a `.env` file with the following structure

```
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN='KEY_THAT_YOU_GET_FROM_MAPBOX'
NEXT_PUBLIC_URL='http://localhost:3000'
```

### Running With docker

1. Clone the Repository
   First, clone the repository containing the "firesmoke" project to your local machine.
2. Install Docker and docker-compose
3. Build the Docker Image
   To build the Docker image for the "firesmoke" service, run the following command in the project directory:
   `docker-compose -f docker-compose-dev.yml build`
4. Start the Development Environment
   To start the development environment, run the following command:
   `docker-compose -f docker-compose-dev.yml up` and you're now able to open it on `localhost:3010`

### Running on own machine with node

1. Clone the Repository
   First, clone the repository containing the "firesmoke" project to your local machine.
2. `cd` into the project folder
3. run `npm i` on the terminal to install dependencies
4. run `npm run dev` on the terminal to run the project and you're now able to open it on `localhost:3000`

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

# Adding links to subnav

If you want to add any links to the subnav:

1. Open the file `src/nav/nav.tsx`
2. Locate the `ul` with the id `id="main-nav-bar"`
3. Inside that list add a new item
   - if it is a link inside this project use the following structure

```
<li className="nav-item">
   <Link
      href={`RELATIVE_REF_TO_URL`}
      className="nav-link active"
      aria-current="page"
   >
      {t("YOUR_TRANSLATION")}
   </Link>
</li>
```

- if it is a link outside this project use the following structure

```
<li className="nav-item">
   <a
      href={`YOUR_URL``}
      className="nav-link active"
      target="_blank"
      rel="noopener noreferrer nofollow"
   >
      {t("YOUR_TRANSLATION")}
   </a>
</li>
```

4. Don't forget to add your translation in both files in the "Nav" key
