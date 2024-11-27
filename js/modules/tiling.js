import Word from './word.js';

class Tiling {
    /**
     * Constructs a Tiling instance with a specified Word.
     * @param {Word} word - The boundary word for the tiling process.
     * @throws {Error} - If the input is not a valid Word instance.
     */
    constructor(word) {
        if (!(word instanceof Word)) {
            throw new Error('Invalid input: word must be an instance of Word.');
        }

        this.word = word;
        this.isTilingPossible = null; // To store the result of the tiling check.
    }

    /**
     * Preprocesses the boundary word to find palindromes and 90-dromes.
     * @returns {object} An object containing all palindromes and 90-dromes found in the word.
     */
    preprocessFactors() {
        const wordStr = this.word.getWord();
        const wordLength = wordStr.length;
        const minLength = Math.floor(wordLength / 3);

        const palindromes = this.findAllPalindromes(wordStr);
        const ninetyDromes = this.findAll90Dromes(wordStr);

        // Filter factors by minimum length
        const longPalindromes = this.getLongFactors(palindromes, minLength);
        const longNinetyDromes = this.getLongFactors(ninetyDromes, minLength);

        return { palindromes: longPalindromes, ninetyDromes: longNinetyDromes };
    }

    /**
     * Finds all palindromic substrings in the boundary word using Manacher's algorithm.
     * @param {string} word - The word to search for palindromes.
     * @returns {Array<{ start: number, end: number, palindrome: string }>} An array of objects containing palindromic substrings and their positions.
     */
    findAllPalindromes(word) {
        const modifiedWord = '#' + word.split('').join('#') + '#';
        const n = modifiedWord.length;
        const p = new Array(n).fill(0);
        let center = 0, right = 0;
        const palindromes = [];

        for (let i = 1; i < n - 1; i++) {
            const mirror = 2 * center - i;

            if (i < right) {
                p[i] = Math.min(right - i, p[mirror]);
            }

            // Expand around center i
            while (modifiedWord[i + (1 + p[i])] === modifiedWord[i - (1 + p[i])]) {
                p[i]++;
            }

            // Update center and right boundary
            if (i + p[i] > right) {
                center = i;
                right = i + p[i];
            }

            // If palindrome length is greater than 1, store it
            if (p[i] > 0) {
                const start = Math.floor((i - p[i]) / 2);
                const end = start + p[i];
                const palindrome = word.slice(start, end);
                palindromes.push({ start, end, palindrome });
            }
        }

        return palindromes;
    }

    /**
     * Finds all 90-dromic substrings in the boundary word.
     * @param {string} word - The word to search for 90-dromes.
     * @param {number} rotDegree  
     * @returns {Array<{ start: number, end: number, drome: string }>} An array of objects containing 90-dromic substrings and their positions.
     */
    findAllThetaDromes(word, rotDegree) {
        const n = word.length;
        const ninetyDromes = [];

        // Iterate over all possible substrings of at least length 4
        for (let start = 0; start < n; start++) {
            for (let end = start + 2; end <= n; end++) {
                const substring = word.slice(start, end);
                const wordObj = new Word(substring);
                try {
                    if (substring.length % 2 ==0 &&  wordObj.isThetaDrome(rotDegree)) {
                        let endIdx = end-1; 
                        ninetyDromes.push({ start, endIdx, drome: substring });
                    }
                } catch (error) {
                    // Ignore invalid rotations
                    continue;
                }
            }
        }

        return ninetyDromes;
    }

    /**
     * Filters factors to keep only those of length ≥ minLength.
     * @param {Array} factors - An array of factors (palindromes or 90-dromes).
     * @param {number} minLength - The minimum length required.
     * @returns {Array} An array of filtered factors.
     */
    getLongFactors(factors, minLength) {
        return factors.filter(factor => (factor.end - factor.start) >= minLength);
    }
}

export default Tiling;