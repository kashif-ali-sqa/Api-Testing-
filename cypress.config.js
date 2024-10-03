const { defineConfig } = require("cypress");
process.env.DEBUG = 'cypress-cucumber-preprocessor:*';
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://gorest.co.in',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('file:preprocessor', cucumber());
    },
    specPattern: "cypress/e2e/features/*.feature",
    // specPattern: "cypress/e2e/Specfile/*.cy.js",
    env: {
      bearerToken: '6a55fca6e0f85fe1e9606ecfb61dbdddde74165a1725fe9d91e7338ab97849ca'
    }
    
  },
});
