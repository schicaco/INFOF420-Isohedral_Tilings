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
            { drome: "durdrl", endIdx: 6, start: 1 },
            { drome: "ur", endIdx: 3, start: 2 },
            { drome: "urdr", endIdx: 5, start: 2 },
            { drome: "rd", endIdx: 4, start: 3 },
            { drome: "dl", endIdx: 8, start: 7 }
        ];
        expect(ninetyDromes).toEqual(expect.arrayContaining(expected));
    });
});
