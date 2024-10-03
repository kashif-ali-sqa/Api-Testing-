Feature: Test POST API

  Scenario: Create a new user via POST API 
    Given I generate a random email
    When I send a POST request to create a new user
    Then the response should contain the newly created user information
  