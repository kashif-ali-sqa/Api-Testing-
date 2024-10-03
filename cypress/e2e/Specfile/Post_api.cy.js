/// <reference types="cypress"/>
import { When, Given, Then } from "cypress-cucumber-preprocessor/steps";

let response;
let testemail = "";
let randomtest = "";



Given("I generate a random email", () => {
  // Generate a random email for the test user
  let pattern = 'ABCDEFGHJIKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < 10; i++) {
    randomtest += pattern.charAt(Math.floor(Math.random() * pattern.length));
  }
  testemail = randomtest + '@gmail.com';
  cy.log(testemail);
});

When("I send a POST request to create a new user", () => {
  let accessToken = '6a55fca6e0f85fe1e9606ecfb61dbdddde74165a1725fe9d91e7338ab97849ca';

  
    cy.request({
      method: 'POST',
      url: "/public/v2/users",
      headers: {
        authorization: "Bearer " + accessToken
      },
      body: {
        "name": 'kashif',
        "gender": 'male',
        "status": 'active',
        "email": testemail
      }
    }).then((res) => {
      response = res;
    });
  
});

Then('the response should contain the newly created user information', () => {
  cy.log(JSON.stringify(response));
  
  // Assert that the status is 201
  expect(response.status).to.eq(201);

  // Assert that the response body contains correct user data
  expect(response.body).to.have.property('name', 'kashif'); // Change 'kashif' to dynamic if necessary
  expect(response.body).to.have.property('gender', 'male'); // Change as necessary
  expect(response.body).to.have.property('status', 'active');
  expect(response.body).to.have.property('email', testemail);
});
