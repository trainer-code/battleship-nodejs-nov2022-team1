import { createCalculator } from './utility';

describe('Calculator', () => {
    let myCalculator;
    beforeEach(() => {
        myCalculator = createCalculator();
    });

    test('should add two numbers', () => {
        // Act
        const sum = myCalculator.add(3,5)

        // Assert
        expect(sum).toEqual(8);
    });

    test('should subtract two numbers', () => {
        // Act
        const sum = myCalculator.subtract(3,5)

        // Assert
        expect(sum).toEqual(-2);
    });

    test('should divide two numbers', () => {
        // Act
        const result = myCalculator.divide(10,2)

        // Assert
        expect(result).toEqual(5);
    });

    test('should produce friendly message when divided by 0', () => {
        // Act
        const result = myCalculator.divide(10,0)

        // Assert
        expect(result).toEqual(Infinity);
    });
});