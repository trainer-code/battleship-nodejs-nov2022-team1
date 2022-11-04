import { binding, given, then, when } from 'cucumber-tsflow';
import { expect } from 'chai';
import { GameBoard } from '../gameboard';
import { ShipLetter } from '../enums';

@binding()
export class GameSteps {
  computerGameBoard: GameBoard;

  @given(/A game board exists/)
  public givenAGameBoardExists() {
    this.computerGameBoard = new GameBoard();
  }

  @when(/\"([a-zA-Z0-9_]*)\" is initialised individually/)
  public initialise(shipName: string) {
    if (shipName === "aircraftCarrier") {
      this.computerGameBoard.initialiseShip(ShipLetter.A, 'B1, B2, B3, C3, D4', 5);
    } else if (shipName === "battleship") {
      this.computerGameBoard.initialiseShip(ShipLetter.B, 'G3, G4, H4, H5', 4);
    }
  }

  @then(/\"([a-zA-Z0-9_]*)\" should be placed in the board/)
  public placedIntheBoard(shipName: string) {
    if (shipName === "aircraftCarrier") {
      const result: any = [
        { 'index': 1, 'isHit': false, 'letter': 'B', 'shipLetter': 'A' },
        { 'index': 2, 'isHit': false, 'letter': 'B', 'shipLetter': 'A' },
        { 'index': 3, 'isHit': false, 'letter': 'B', 'shipLetter': 'A' },
        { 'index': 3, 'isHit': false, 'letter': 'C', 'shipLetter': 'A' },
        { 'index': 4, 'isHit': false, 'letter': 'D', 'shipLetter': 'A' }];

      expect(this.computerGameBoard.ships.aircraftCarrier).to.eql(result);
    } else if (shipName === "battleship") {
      const result: any = [
        { 'index': 3, 'isHit': false, 'letter': 'G', 'shipLetter': 'B' },
        { 'index': 4, 'isHit': false, 'letter': 'G', 'shipLetter': 'B' },
        { 'index': 4, 'isHit': false, 'letter': 'H', 'shipLetter': 'B' },
        { 'index': 5, 'isHit': false, 'letter': 'H', 'shipLetter': 'B' }];

      expect(this.computerGameBoard.ships.battleship).to.eql(result);
    }

  }
}
