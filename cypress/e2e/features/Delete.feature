Feature: Test User API

  Scenario: Create and delete a user
    Given the API endpoint is ready to accept requests
    When I create a user
    Then I delete the user
    