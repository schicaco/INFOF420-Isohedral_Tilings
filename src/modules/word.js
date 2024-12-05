import { DIRECTION, ROTATION } from "../constants";
import { WordError } from "../core/error";
import Factor from "../modules/factor";

class Word {
    /**
     * Validates and creates a word.
     * @param {string} word - The word to validate.
     * @returns {string} - The validated word.
     * @throws {WordError} - If the word is invalid.
     */
    static create(word) {
        if (typeof word !== "string") throw WordError.INVALID_TYPE;
        if (word.length < 4) throw WordError.INVALID_LENGTH;
        if (!this.isValidWord(word)) throw WordError.INVALID_WORD;
        return word;
    }

    /**
     * Checks if the word consists only of valid directions.
     * @param {string} word - The word to validate.
     * @returns {boolean} - True if the word is valid, false otherwise.
     */
    static isValidWord(word) {
        const validDirections = new Set(Object.values(DIRECTION));
        return [...word].every(char => validDirections.has(char));
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
     * @returns {Factor} - Factor representing the center of the word.
     */
    static getCenter(word) {
        const mid = Math.floor(word.length / 2);
        if (this.isEvenLength(word)) {
            return new Factor(word, mid - 1, mid);
        } else {
            return new Factor(word, mid, mid);
        }
    }

    /**
     * Retrieves the letter at a specific index (supports negative indices).
     * @param {string} word - The word.
     * @param {number} index - The index to retrieve the letter from.
     * @returns {string} - The letter at the given index.
     * @throws {WordError} - If the index is invalid.
     */
    static getLetter(word, index) {
        const adjustedIndex = index < 0 ? word.length + index : index;
        if (adjustedIndex < 0 || adjustedIndex >= word.length) throw WordError.INVALID_INDEX;
        return word[adjustedIndex];
    }

    /**
     * Rotates a letter by the given angle.
     * @param {string} letter - The letter to rotate.
     * @param {number} theta - The rotation angle (must be a multiple of 90).
     * @returns {string} - The rotated letter.
     * @throws {WordError} - If the angle or letter is invalid.
     */
    static rotateLetter(letter, theta) {
        theta = theta % 360;
        if (theta % 90 !== 0) throw WordError.INVALID_ANGLE;
        if (!ROTATION[letter]) throw WordError.INVALID_LETTER;
        return ROTATION[letter][theta];
    }

    /**
     * Rotates an entire word by the given angle.
     * @param {string} word - The word to rotate.
     * @param {number} theta - The rotation angle (must be a multiple of 90).
     * @returns {string} - The rotated word.
     */
    static rotateWord(word, theta) {
        return [...word].map(letter => this.rotateLetter(letter, theta)).join("");
    }

    /**
     * Finds the complement of a letter (rotates by 180 degrees).
     * @param {string} letter - The letter to complement.
     * @returns {string} - The complemented letter.
     */
    static complementLetter(letter) {
        return this.rotateLetter(letter, 180);
    }

    /**
     * Finds the complement of an entire word.
     * @param {string} word - The word to complement.
     * @returns {string} - The complemented word.
     */
    static complementWord(word) {
        return [...word].map(letter => this.complementLetter(letter)).join("");
    }

    /**
     * Reverses the word.
     * @param {string} word - The word to reverse.
     * @returns {string} - The reversed word.
     */
    static reverseWord(word) {
        return [...word].reverse().join("");
    }

    /**
     * Finds the "backtrack" of the word (reverse and complement each letter).
     * @param {string} word - The word to backtrack.
     * @returns {string} - The backtracked word.
     */
    static backtrackWord(word) {
        const reversedWord = this.reverseWord(word);
        const complementedWord = this.complementWord(reversedWord);

        return complementedWord;
    }

    /**
     * Extracts a substring (factor) from the word between indices i and j (inclusive).
     * @param {string} word - The word.
     * @param {number} i - Start index.
     * @param {number} j - End index.
     * @returns {Factor} - The extracted factor.
     */
    static getFactor(word, i, j) {
        return new Factor(word, i, j);
    }

    /**
     * Determines if the factor is a prefix of the word.
     * @param {string} word - The word.
     * @param {Factor} factor - The factor to check.
     * @returns {boolean} - True if the factor is a prefix.
     */
    static isPrefix(word, factor) {
        return word.startsWith(factor.value);
    }

    /**
     * Determines if the factor is a suffix of the word.
     * @param {string} word - The word.
     * @param {Factor} factor - The factor to check.
     * @returns {boolean} - True if the factor is a suffix.
     */
    static isSuffix(word, factor) {
        return word.endsWith(factor.value);
    }

    /**
     * Determines whether the word is a palindrome.
     * @param {string} word - The word.
     * @returns {boolean} - True if the word is a palindrome.
     */
    static isPalindrome(word) {
        return word === this.reverseWord(word);
    }

    /**
     * Determines whether the word is composite (repeated substrings).
     * @param {string} word - The word.
     * @returns {boolean} - True if the word is composite.
     */
    static isComposite(word) {
        const length = word.length;
        for (let i = 1; i <= length / 2; i++) {
            if (length % i === 0 && word.slice(0, i).repeat(length / i) === word) {
                return true;
            }
        }
        return false;
    }

    /**
     * Determines whether the word is primitive (not composite).
     * @param {string} word - The word.
     * @returns {boolean} - True if the word is primitive.
     */
    static isPrimitive(word) {
        return !this.isComposite(word);
    }

    /**
     * Determines whether the word is a theta-drome.
     * @param {string} word - The word.
     * @param {number} theta - The rotation angle.
     * @returns {boolean} - True if the word is a theta-drome.
     */
    static isThetaDrome(word, theta) {
        theta = (theta % 360 + 360) % 360;

        if (theta % 90 !== 0) {
            throw WordError.INVALID_ANGLE;
        }

        const half = Math.floor(word.length / 2);
        const firstHalf = word.slice(0, half);
        const secondHalf = word.slice(-half);

        const reversedFirstHalf = Word.reverseWord(firstHalf);
        const rotatedFirstHalf = Word.rotateWord(reversedFirstHalf, theta + 180);

        return rotatedFirstHalf === secondHalf;
    }

    /**
     * Determines whether the word is a palindrome.
     * @param {string} word - The word.
     * @returns {boolean} - True if the word is a palindrome.
     */
    static isPalindrome(word) {
        return Word.isThetaDrome(word, 180);
    }
}

export default Word;