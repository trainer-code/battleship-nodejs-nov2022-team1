Feature: Battleship game
  In order to do play game
  As a responsible developer
  I want to initialise my board properly

  Scenario: Initialise game board with aircraftCarrier
    Given A game board exists
    When "aircraftCarrier" is initialised individually
    Then "aircraftCarrier" should be placed in the board

   Scenario: Initialise game board with battleship
    Given A game board exists
    When "battleship" is initialised individually
    Then "battleship" should be placed in the board
