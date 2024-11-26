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
     * @param {string} word - The word to preprocess.
     * @returns {object} An object containing all palindromes and 90-dromes found in the word.
     */
    preprocessFactors(word) {
        const palindromes = this.findAllPalindromes(word); // Use Manacher's algorithm
        const ninetyDromes = this.findAll90Dromes(word);  // Custom logic for 90-dromes
        return { palindromes, ninetyDromes };
    }

    /**
     * Finds all palindromes in a given word using Manacher's algorithm.
     * @param {string} word - The word to search for palindromes.
     * @returns {string[]} An array of palindromic substrings.
     */
    findAllPalindromes(word) {
        const n = word.length;
        const result = [];
        const radius = new Array(n).fill(0);

        let center = 0;
        let right = 0;

        for (let i = 0; i < n; i++) {
            const mirror = 2 * center - i;

            if (i < right) {
                radius[i] = Math.min(right - i, radius[mirror]);
            }

            // Attempt to expand palindrome centered at i
            while (
                i + radius[i] + 1 < n &&
                i - radius[i] - 1 >= 0 &&
                word[i + radius[i] + 1] === word[i - radius[i] - 1]
            ) {
                radius[i]++;
            }

            // Update center and right boundary
            if (i + radius[i] > right) {
                center = i;
                right = i + radius[i];
            }

            // If radius[i] > 0, add the palindrome substring
            if (radius[i] > 0) {
                result.push(word.slice(i - radius[i], i + radius[i] + 1));
            }
        }

        return result;
    }

    /**
     * Finds all 90-dromes in a given word. (Custom logic here.)
     * @param {string} word - The word to search for 90-dromes.
     * @returns {string[]} An array of 90-dromic substrings.
     */
    findAll90Dromes(word) {
        // Replace this with actual logic for finding 90-dromes
        const result = [];
        return result;
    }
}

export default Tiling;