import Word from './word';

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
     * Checks if the word has an even length.
     * @param {string} word - The word to check.
     * @returns {boolean} - True if the word length is even, false otherwise.
     */
    static isEvenLength(word) {
        return word.length % 2 === 0;
    }

    /**
     * Gets the center indices of the word.
     * @param {string} word - The word.
     * @returns {number[]} - Array of center indices.
     */
    static getCenter(word) {
        const mid = Math.floor(word.length / 2);
        return this.isEvenLength(word) ? [mid - 1, mid] : [mid, mid];
    }

    /**
     * Shifts the word by the specified number of positions.
     * @param {string} word - The word to shift.
     * @param {number} shift - The number of positions to shift.
     * @returns {string} - The shifted word.
     */
    static shiftWord(word, shift) {
        const length = word.length;
        if (length === 0 || shift % length === 0) return word; // No change needed for empty strings or zero shifts

        shift = ((shift % length) + length) % length; // Normalize shift
        return word.slice(-shift) + word.slice(0, -shift);
    }

    /**
     * Computes all palindromic substrings expanding from the center of the word.
     * @param {string} word - The word.
     * @returns {string[]} - Array of palindromic substrings.
     */
    static computePalindrome(word) {
        const palindromes = [];
        const n = word.length;
        let [left, right] = this.getCenter(word);

        while (left >= 0 && right < n && word[left] === word[right]) {
            palindromes.push(word.slice(left, right + 1));
            left--;
            right++;
        }

        return palindromes;
    }

    /**
     * Computes all palindromic substrings of shifted versions of the word.
     * @param {string} word - The word.
     * @returns {Object} - Object mapping shifted words to their palindromes.
     */
    static computePalindromes(word) {
        const palindromes = {};
        for (let i = 0; i < word.length; i++) {
            const shiftedWord = this.shiftWord(word, i);
            palindromes[shiftedWord] = this.computePalindrome(shiftedWord);
        }
        return palindromes;
    }

    /**
     * Computes theta-dromes starting at each position in the word.
     * @param {string} word - The word.
     * @returns {Object} - Object mapping start indices to theta-drome substrings.
     */
    static computeThetaDromeStartingAt(word) {
        const thetadromes = {};
        const n = word.length;

        for (let i = 0; i < n; i++) {
            const substrings = [];

            for (let j = i; j < n; j++) {
                const substring = Word.getFactor(word, i, j);
                if (Word.isThetaDrome(substring, 90)) {
                    substrings.push(substring);
                }
            }

            thetadromes[i] = substrings.sort((a, b) => a.length - b.length);
        }

        return thetadromes;
    }

    /**
     * Computes theta-dromes ending at each position in the word.
     * @param {string} word - The word.
     * @returns {Object} - Object mapping end indices to theta-drome substrings.
     */
    static computeThetaDromeEndingAt(word) {
        const thetadromes = {};
        const n = word.length;

        for (let i = 0; i < n; i++) {
            const substrings = [];

            for (let j = 0; j <= i; j++) {
                const substring = Word.getFactor(word, j, i);
                if (Word.isThetaDrome(substring, 90)) {
                    substrings.push(substring);
                }
            }

            thetadromes[i] = substrings.sort((a, b) => a.length - b.length);
        }

        return thetadromes;
    }

    /**
     * Computes theta-dromes for shifted versions of the word starting at each index.
     * @param {string} word - The word.
     * @returns {Object} - Object mapping shifted words to theta-drome results.
     */
    static computeThetaDromesStartingAt(word) {
        const thetadromes = {};
        for (let i = 0; i < word.length; i++) {
            const shiftedWord = this.shiftWord(word, i);
            thetadromes[shiftedWord] = this.computeThetaDromeStartingAt(shiftedWord);
        }
        return thetadromes;
    }

    /**
     * Computes theta-dromes for shifted versions of the word ending at each index.
     * @param {string} word - The word.
     * @returns {Object} - Object mapping shifted words to theta-drome results.
     */
    static computeThetaDromesEndingAt(word) {
        const thetadromes = {};
        for (let i = 0; i < word.length; i++) {
            const shiftedWord = this.shiftWord(word, i);
            thetadromes[shiftedWord] = this.computeThetaDromeEndingAt(shiftedWord);
        }
        return thetadromes;
    }

    /**
     * Extracts long theta-dromes from the computed results.
     * @param {string} word - The word.
     * @param {Object} thetadromes - Theta-drome results to filter.
     * @returns {Object} - Object containing long theta-dromes.
     */
    static extractLongThetaDromes(word, thetadromes) {
        const longThetadromes = {};
        const minLength = Math.ceil(word.length / 3);

        for (const [key, values] of Object.entries(thetadromes)) {
            if (typeof values !== 'object') continue; // Skip if values is not iterable

            // Ensure values[index] is iterable (e.g., array)
            Object.entries(values).forEach(([index, substrings]) => {
                if (!Array.isArray(substrings)) return; // Skip non-array values

                substrings.forEach(substring => {
                    if (substring.length >= minLength) {
                        if (!longThetadromes[key]) {
                            longThetadromes[key] = [];
                        }
                        if (!longThetadromes[key].includes(substring)) {
                            longThetadromes[key].push(substring);
                        }
                    }
                });
            });
        }

        return longThetadromes;
    }
}

export default BoundaryWord;