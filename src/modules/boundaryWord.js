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
     * @returns {Object} - Object mapping center indices to their palindromes.
     */
    static computePalindromes(word) {
        const palindromes = {};
        const n = word.length;

        const center = this.getCenter(word);

        for (let i = 0; i < word.length; i++) {
            const shiftedWord = this.shiftWord(word, i);
            const palindrome = this.computePalindrome(shiftedWord);

            let left = (center[0] + i) % n;
            let right = (center[1] + i) % n;
            
            palindromes[left] = palindromes[left] || [];
            palindromes[left].push(...palindrome);

            if (left !== right) {
                palindromes[right] = palindromes[right] || [];
                palindromes[right].push(...palindrome);
            }
        }

        return palindromes;
    }

    /**
     * Computes theta-dromes for shifted versions of the word starting at each index.
     * @param {string} word - The word.
     * @returns {Object} - Object mapping shifted words to theta-drome results.
     */
    static computeThetaDromesStartingAt(word) {
        const thetadromes = {};
        const n = word.length;

        for (let i = 0; i < n; i++) {
            const shiftedWord = this.shiftWord(word, i);
            thetadromes[i] = [];

            for (let j = 0; j < n; j++) {
                const substring = Word.getFactor(shiftedWord, 0, j);

                if (Word.isThetaDrome(substring, 90)) {
                    thetadromes[i].push(substring);
                }
            }

            thetadromes[i].sort((a, b) => a.length - b.length);
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
        const n = word.length;
        
        for (let i = 0; i < n; i++) {
            const shiftedWord = this.shiftWord(word, i);
            const index = n - i - 1;
            thetadromes[index] = [];
    
            for (let j = 0; j < n; j++) {
                const substring = Word.getFactor(shiftedWord, j, n - 1);
    
                if (Word.isThetaDrome(substring, 90)) {
                    thetadromes[index].push(substring);
                }
            }

            thetadromes[index].sort((a, b) => a.length - b.length);
        }

        return thetadromes;
    }
}

export default BoundaryWord;