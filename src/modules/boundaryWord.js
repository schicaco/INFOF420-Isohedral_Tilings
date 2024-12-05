import Word from './word';
import Factor from './factor';
import { FactorError } from '../core/error';

class BoundaryWord extends Word {
    /**
     * Creates a BoundaryWord instance by validating the input word.
     * @param {string} word - The word to validate.
     * @returns {string} - The validated word.
     */
    static create(word) {
        return super.create(word);
    }

    /**
     * Shifts the word by the specified number of positions.
     * @param {string} word - The word to shift.
     * @param {number} shift - The number of positions to shift.
     * @returns {string} - The shifted word.
     */
    static shiftWord(word, shift) {
        if (typeof shift !== "number" || !Number.isInteger(shift)) {
            throw FactorError.INVALID_TYPE;
        }
        const length = word.length;
        if (length === 0 || shift % length === 0) return word;

        shift = ((shift % length) + length) % length; // Normalize shift
        return word.slice(-shift) + word.slice(0, -shift);
    }

    /**
     * Computes the longest theta-dromes for shifted versions of the word starting at each index.
     * @param {string} word - The input word.
     * @returns {Object} - An object mapping indices to the longest theta-drome.
     */
    static computePalindromesStartingAt(word) {
        const palindromes = {};
        const n = word.length;

        for (let i = 0; i < n; i++) {
            const shiftedWord = this.shiftWord(word, i);

            let longestPalindrome = ""; // Keep track of the longest palindrome for this shift

            for (let j = 1; j < n; j++) { // Substrings of length 1 to n
                const factor = new Factor(shiftedWord, 0, j);

                if (Word.isPalindrome(factor.value) && factor.length > longestPalindrome.length) {
                    longestPalindrome = factor;
                }
            }

            // Store the longest palindrome for this shift index
            palindromes[i] = longestPalindrome;
        }

        return palindromes;
    }

    /**
     * Computes the longest theta-dromes for shifted versions of the word ending at each index.
     * @param {string} word - The input word.
     * @returns {Object} - An object mapping indices to the longest theta-drome.
     */
    static computePalindromesEndingAt(word) {
        const palindromes = {};
        const n = word.length;

        for (let i = 0; i < n; i++) {
            const shiftedWord = this.shiftWord(word, i);
            const index = n - i;

            let longestPalindrome = ""; // Keep track of the longest palindrome for this ending index

            for (let j = 1; j < n; j++) { // Substrings ending at `n - 1`
                const factor = new Factor(shiftedWord, j, n - 1);

                if (Word.isPalindrome(factor.value) && factor.length > longestPalindrome.length) {
                    longestPalindrome = factor;
                }
            }

            // Store the longest palindrome for this ending index
            palindromes[index] = longestPalindrome;
        }

        return palindromes;
    }

    /**
     * Computes theta-dromes for shifted versions of the word starting at each index.
     * @param {string} word - The input word.
     * @returns {Object} - An object mapping indices to arrays of theta-dromes.
     */
    static computeThetaDromesStartingAt(word) {
        const thetadromes = {};
        const n = word.length;

        for (let i = 0; i < n; i++) {
            const shiftedWord = this.shiftWord(word, i);
            thetadromes[i] = [];

            for (let j = 0; j < n; j++) {
                const factor = Word.getFactor(shiftedWord, 0, j);

                if (Word.isThetaDrome(factor.value, 90)) {
                    thetadromes[i].push(factor);
                }
            }

            thetadromes[i].sort((a, b) => a.length - b.length);
        }

        return thetadromes;
    }

    /**
     * Computes theta-dromes for shifted versions of the word ending at each index.
     * @param {string} word - The input word.
     * @returns {Object} - An object mapping indices to arrays of theta-dromes.
     */
    static computeThetaDromesEndingAt(word) {
        const thetadromes = {};
        const n = word.length;

        for (let i = 0; i < n; i++) {
            const shiftedWord = this.shiftWord(word, i);
            const index = n - i - 1;
            thetadromes[index] = [];

            for (let j = 0; j < n; j++) {
                const factor = Word.getFactor(shiftedWord, j, n - 1);

                if (Word.isThetaDrome(factor.value, 90)) {
                    thetadromes[index].push(factor);
                }
            }

            thetadromes[index].sort((a, b) => a.length - b.length);
        }

        return thetadromes;
    }

    /**
     * Filters factors with length greater than or equal to the specified minimum length.
     * @param {number} wordLength - Minimum length of factors to include.
     * @param {Object} factors - An object mapping indices to arrays of factors.
     * @returns {Object} - Filtered factors.
     */
    static extractLongFactors(wordLength, factors) {
        const longFactors = {};

        for (const index in factors) {
            longFactors[index] = [];

            for (const factor of factors[index]) {
                if (factor.length >= wordLength/3) {
                    longFactors[index].push(factor);
                }
            }
        }

        return longFactors;
    }
}

export default BoundaryWord;