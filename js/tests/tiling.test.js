import Tiling from '../modules/tiling.js';
import BoundaryWord from '../modules/boundaryWord.js';
import { Alphabet4Letters } from '../modules/boundaryWord.js';

describe('Tiling Class Tests', () => {
    test('should instantiate correctly with a valid BoundaryWord', () => {
        const validWord = new BoundaryWord('uurddl');
        const tiling = new Tiling(validWord);
        expect(tiling).toBeInstanceOf(Tiling);
        expect(tiling.boundaryWord).toBe(validWord);
        expect(tiling.isTilingPossible).toBeNull();
    });

    test('should throw an error when instantiated with an invalid BoundaryWord', () => {
        const invalidWord = "invalid";
        expect(() => new Tiling(invalidWord)).toThrow('Invalid input: boundaryWord must be an instance of BoundaryWord.');
    });

    test('should not modify the boundary word', () => {
        const word = new BoundaryWord('uurddl');
        const tiling = new Tiling(word);
        expect(tiling.boundaryWord.getWord()).toBe('uurddl');
    });
});

describe('Tiling - Palindrome Function', () => {
    test('should find all palindromic substrings in a word', () => {
        // Example word and setup
        const boundaryWord = new BoundaryWord("ruurruur");
        const tiling = new Tiling(boundaryWord);

        // Expected palindromes
        const expectedPalindromes = ['ruur', 'uu', 'uurruu', 'ruurruur', 'rr', 'urru'];

        // Call the function
        const palindromes = tiling.findAllPalindromes(word);

        // Assert the result matches expected palindromes
        expect(palindromes).toEqual(expect.arrayContaining(expectedPalindromes));
    });

    test('should return an empty array for a word with no palindromes', () => {
        // Example word and setup
        const boundaryWord = new BoundaryWord("urld");
        const tiling = new Tiling(boundaryWord);

        // Expected result
        const expectedPalindromes = [];

        // Call the function
        const palindromes = tiling.findAllPalindromes(word);

        // Assert that no palindromes are found
        expect(palindromes).toEqual(expectedPalindromes);
    });

    test('should find single-letter palindromes in a word', () => {
        // Example word and setup
        const boundaryWord = new BoundaryWord("u");
        const tiling = new Tiling(boundaryWord);

        // Expected result
        const expectedPalindromes = ['u'];

        // Call the function
        const palindromes = tiling.findAllPalindromes(word);

        // Assert the single-letter palindrome is found
        expect(palindromes).toEqual(expectedPalindromes);
    });
});