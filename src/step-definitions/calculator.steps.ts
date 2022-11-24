import { binding, given, then, when } from 'cucumber-tsflow';
import { expect } from 'chai';
import { ICalculator } from '../interfaces';
import { createCalculator } from '../utility';

@binding()
export class GameSteps {
  calculator: ICalculator;
  result: number;
  number1: number;
  number2: number;

  @given(/I have a calculator;/)
  public givenAGameBoardExists() {
    this.calculator = createCalculator();
  }

  @when(/I enter the following two numbers: (-?\d+) and (-?\d+),/)
  public calculateAdd(a: number, b: number) {
    this.number1 = a;
    this.number2 = b;
  }

  @then(/I will get a total value of (-?\d+)\ if I use \"([a-zA-Z0-9_]*)\"./)
  public placedIntheBoard(expectedResult: number, operator: string) {
    if (operator === "addition") {
      this.result = this.calculator.add(this.number1, this.number2);
    } else  if (operator === "multiplication") {
      this.result = this.calculator.multiply(this.number1, this.number2);
    }

    expect(this.result).to.eql(expectedResult);

  }
}
