import Tiling from '../modules/tiling.js';
import word from '../modules/word.js';
import { Alphabet4Letters } from '../modules/word.js';

describe('Tiling Class Tests', () => {
    test('should instantiate correctly with a valid word', () => {
        const validWord = new word('uurddl');
        const tiling = new Tiling(validWord);
        expect(tiling).toBeInstanceOf(Tiling);
        expect(tiling.word).toBe(validWord);
        expect(tiling.isTilingPossible).toBeNull();
    });

    test('should throw an error when instantiated with an invalid word', () => {
        const invalidWord = "invalid";
        expect(() => new Tiling(invalidWord)).toThrow('Invalid input: word must be an instance of Word.');
    });

    test('should not modify the boundary word', () => {
        const validWord = new word('uurddl');
        const tiling = new Tiling(validWord);
        expect(tiling.word.getWord()).toBe('uurddl');
    });
});

// Test for finding 90-dromes
describe('findAll90Dromes', () => {
    test('identifies all 90-dromic substrings', () => {
        const validWord = new word('ldurdrldl');
        const tiling = new Tiling(validWord);
        const ninetyDromes = tiling.findAllThetaDromes(validWord.getWord(), 90);
        const expected = [
            { drome: "durdrl", end: 6, start: 1 },
            { drome: "ur", end: 3, start: 2 },
            { drome: "urdr", end: 5, start: 2 },
            { drome: "rd", end: 4, start: 3 },
            { drome: "dl", end: 8, start: 7 }
        ];
        expect(ninetyDromes).toEqual(expect.arrayContaining(expected));
    });
});

describe('isQuarterTurnFactorizationPossible', () => {
    let wordInstance;
    let tiling;

    beforeEach(() => {
        // Reset instances for each test
        wordInstance = null;
        tiling = null;
    });

    test('Valid factorization with A as long factor', () => {
        wordInstance = new word('uuurruuudurdrlrlud');
        tiling = new Tiling(wordInstance);

        expect(tiling.isQuarterTurnFactorizationPossible()).toBe(true);
    });

    test('Valid factorization with B as long factor', () => {
        wordInstance = new word('urrudurdrlrlud');
        tiling = new Tiling(wordInstance);

        expect(tiling.isQuarterTurnFactorizationPossible()).toBe(true);
    });

    test('Valid factorization with C as long factor', () => {
        wordInstance = new word('urrurluddurdrl');
        tiling = new Tiling(wordInstance);

        expect(tiling.isQuarterTurnFactorizationPossible()).toBe(true);
    });

    test('No valid factorization', () => {
        wordInstance = new word('uurldlururul');
        tiling = new Tiling(wordInstance);

        expect(tiling.isQuarterTurnFactorizationPossible()).toBe(false);
    });

    test('Boundary word with no palindromes or 90-dromes', () => {
        wordInstance = new word('uldrdlu');
        tiling = new Tiling(wordInstance);

        expect(tiling.isQuarterTurnFactorizationPossible()).toBe(false);
    });
});


describe('Tiling - getLongFactors', () => {
    let tiling;

    beforeEach(() => {
        const validWord = new word('uuulruuurldluuur');
        tiling = new Tiling(validWord);
    });

    test('filters factors with length greater than or equal to minLength', () => {
        const factors = [
            { start: 0, end: 2, drome: 'uuu' },  // length = 3
            { start: 3, end: 7, drome: 'luruu' }, // length = 5
            { start: 8, end: 9, drome: 'rl' },   // length = 2
        ];
        const minLength = 3;

        const result = tiling.getLongFactors(factors, minLength);

        expect(result).toEqual([
            { start: 0, end: 2, drome: 'uuu' },
            { start: 3, end: 7, drome: 'luruu' },
        ]);
    });

    test('filters factors with length ≥ minLength from the provided list', () => {
        const factors = [
            { drome: "uu", end: 1, start: 0 },       // length = 2
            { drome: "uuurruuu", end: 7, start: 0 }, // length = 8
            { drome: "uu", end: 2, start: 1 },       // length = 2
            { drome: "uurruu", end: 6, start: 1 },   // length = 6
            { drome: "urru", end: 5, start: 2 },     // length = 4
            { drome: "rr", end: 4, start: 3 },       // length = 2
            { drome: "uu", end: 6, start: 5 },       // length = 2
            { drome: "uu", end: 7, start: 6 },       // length = 2
        ];

        const minLength = 6;

        const result = tiling.getLongFactors(factors, minLength);

        const expected = [
            { drome: "uuurruuu", end: 7, start: 0 }, // length = 8
            { drome: "uurruu", end: 6, start: 1 },   // length = 6
        ];

        expect(result).toEqual(expected);
    });
});


