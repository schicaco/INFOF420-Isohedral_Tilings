import BoundaryWord from './boundaryWord.js';

/**
 * Class representing a tiling process for a given boundary word.
 */
class Tiling {
    /**
     * Constructs a Tiling instance with a specified BoundaryWord.
     * @param {BoundaryWord} boundaryWord - The boundary word for the tiling process.
     * @throws {Error} - If the input is not a valid BoundaryWord instance.
     */
    constructor(boundaryWord) {
        if (!(boundaryWord instanceof BoundaryWord)) {
            throw new Error('Invalid input: boundaryWord must be an instance of BoundaryWord.');
        }

        this.boundaryWord = boundaryWord;
        this.isTilingPossible = null; // To store the result of the tiling check.
    }

    /**
     * Preprocesses the boundary word to find palindromes and 90-dromes.
     * @param {BoundaryWord} word - The word to preprocess.
     * @returns {object} An object containing all palindromes and 90-dromes found in the word.
     */
    preprocessFactors(word) {
        const palindromes = this.findAllPalindromes(word); // Use Manacher's algorithm
        const ninetyDromes = this.findAll90Dromes(word);  // Custom logic for 90-dromes
        return { palindromes, ninetyDromes };
    }

    /**
     * Finds all palindromes in a given word using Manacher's algorithm.
     * @param {BoundaryWord} word - The word to search for palindromes.
     * @returns {BoundaryWord[]} An array of palindromic substrings.
     */
    findAllPalindromes(word) {
        return result;
    }

    /**
     * Finds all 90-dromes in a given word. (Custom logic here.)
     * @param {BoundaryWord} word - The word to search for 90-dromes.
     * @returns {BoundaryWord[]} An array of 90-dromic substrings.
     */
    findAll90Dromes(word) {
        const result = [];
        // Replace this with actual logic for finding 90-dromes
        return result;
    }

    /**
     * Keep the k-dromes where the factor is >= |W|/3
     * @param {BoundaryWord[]} factors - k-dromes and 90-dromes 
     * @returns {integer} The minimum size 
     */    
    getLongFactors(factors, minLength) {
        return factors.filter(factor => factor.length >= minLength);
    }
}

export default Tiling;