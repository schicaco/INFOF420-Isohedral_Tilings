import { DIRECTION, ROTATION } from "../constants";
import WordError from "../core/wordError";

class Word {
    /**
     * Validates and creates a word.
     * @param {string} word - The word to validate.
     * @returns {string} - The validated word.
     * @throws {WordError} - If the word is invalid.
     */
    static create(word) {
        if (typeof word !== 'string') {
            throw WordError.INVALID_TYPE;
        }

        if (word.length < 4) {
            throw WordError.INVALID_LENGTH;
        }

        if (!Word.isValidWord(word)) {
            throw WordError.INVALID_WORD;
        }

        return word;
    }

    /**
     * Checks if the word consists only of valid directions.
     * @param {string} word - The word to validate.
     * @returns {boolean} - True if the word is valid, false otherwise.
     */
    static isValidWord(word) {
        const validDirections = Object.values(DIRECTION);
        return [...word].every(char => validDirections.includes(char));
    }

    /**
     * Retrieves the letter at a specific index (supports negative indices).
     * @param {string} word - The word.
     * @param {number} index - The index to retrieve the letter from.
     * @returns {string} - The letter at the given index.
     * @throws {WordError} - If the index is invalid.
     */
    static getLetter(word, index) {
        const length = word.length;
        index = index < 0 ? length + index : index;

        if (index < 0 || index >= length) {
            throw WordError.INVALID_INDEX;
        }
        return word[index];
    }

    /**
     * Rotates a letter by the given angle.
     * @param {string} letter - The letter to rotate.
     * @param {number} theta - The rotation angle (must be a multiple of 90).
     * @returns {string} - The rotated letter.
     * @throws {WordError} - If the angle or letter is invalid.
     */
    static rotateLetter(letter, theta) {
        if (theta % 90 !== 0) {
            throw WordError.INVALID_ANGLE;
        }

        if (!ROTATION[letter]) {
            throw WordError.INVALID_LETTER;
        }

        return ROTATION[letter][(theta % 360 + 360) % 360];
    }

    /**
     * Rotates an entire word by the given angle.
     * @param {string} word - The word to rotate.
     * @param {number} theta - The rotation angle (must be a multiple of 90).
     * @returns {string} - The rotated word.
     */
    static rotateWord(word, theta) {
        if (theta % 90 !== 0) {
            throw WordError.INVALID_ANGLE;
        }

        return [...word]
            .map(letter => Word.rotateLetter(letter, theta))
            .join('');
    }

    /**
     * Finds the complement of a letter (rotates by 180 degrees).
     * @param {string} letter - The letter to complement.
     * @returns {string} - The complemented letter.
     */
    static complementLetter(letter) {
        return Word.rotateLetter(letter, 180);
    }

    /**
     * Finds the complement of an entire word.
     * @param {string} word - The word to complement.
     * @returns {string} - The complemented word.
     */
    static complementWord(word) {
        return [...word]
            .map(letter => Word.complementLetter(letter))
            .join('');
    }

    /**
     * Reverses the word.
     * @param {string} word - The word to reverse.
     * @returns {string} - The reversed word.
     */
    static reverseWord(word) {
        return [...word].reverse().join('');
    }

    /**
     * Finds the "backtrack" of the word (reverse and complement each letter).
     * @param {string} word - The word to backtrack.
     * @returns {string} - The backtracked word.
     */
    static backtrackWord(word) {
        return [...word]
            .reverse()
            .map(letter => Word.complementLetter(letter))
            .join('');
    }

    /**
     * Extracts a substring (factor) from the word between indices i and j (inclusive).
     * @param {string} word - The word.
     * @param {number} i - Start index.
     * @param {number} j - End index.
     * @returns {string} - The extracted factor.
     * @throws {WordError} - If indices are invalid.
     */
    static getFactor(word, i, j) {
        if (i < 0 || j < i || j >= word.length) {
            throw WordError.INVALID_INDEX;
        }

        return word.slice(i, j + 1);
    }

    /**
     * Determines whether the factor is a prefix of the word.
     * @param {string} word - The word.
     * @param {string} factor - The factor to check.
     * @returns {boolean} - True if the factor is a prefix.
     */
    static isPrefix(word, factor) {
        return word.startsWith(factor);
    }

    /**
     * Determines whether the factor is a suffix of the word.
     * @param {string} word - The word.
     * @param {string} factor - The factor to check.
     * @returns {boolean} - True if the factor is a suffix.
     */
    static isSuffix(word, factor) {
        return word.endsWith(factor);
    }

    /**
     * Determines whether the factor is an affix (prefix or suffix) of the word.
     * @param {string} word - The word.
     * @param {string} factor - The factor to check.
     * @returns {boolean} - True if the factor is an affix.
     */
    static isAffix(word, factor) {
        return Word.isPrefix(word, factor) || Word.isSuffix(word, factor);
    }

    /**
     * Determines whether the factor is a middle substring (not an affix) of the word.
     * @param {string} word - The word.
     * @param {string} factor - The factor to check.
     * @returns {boolean} - True if the factor is a middle substring.
     */
    static isMiddle(word, factor) {
        return !Word.isAffix(word, factor);
    }

    /**
     * Finds the center character(s) of the word.
     * @param {string} word - The word.
     * @returns {string} - The center character(s).
     */
    static findCenter(word) {
        const mid = Math.floor(word.length / 2);
        return word.length % 2 === 0
            ? word.slice(mid - 1, mid + 1)
            : word.charAt(mid);
    }

    /**
     * Determines whether the factor is the center of the word.
     * @param {string} word - The word.
     * @param {string} factor - The factor to check.
     * @returns {boolean} - True if the factor is the center.
     */
    static isCenter(word, factor) {
        return Word.findCenter(word) === factor;
    }

    /**
     * Determines whether the factor is a period of the word.
     * @param {string} word - The word.
     * @param {string} factor - The factor to check.
     * @returns {boolean} - True if the factor is a period.
     */
    static isPeriod(word, factor) {
        const wordLength = word.length;
        const factorLength = factor.length;

        if (wordLength % factorLength === 0) {
            const repeatedFactor = factor.repeat(wordLength / factorLength);
            return repeatedFactor === word;
        }

        return false;
    }

    /**
     * Determines whether the word is composite (repeated substrings).
     * @param {string} word - The word.
     * @returns {boolean} - True if the word is composite.
     */
    static isComposite(word) {
        for (let i = 1; i <= word.length / 2; i++) {
            const subword = word.slice(0, i);
            if (Word.isPeriod(word, subword)) {
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
        return !Word.isComposite(word);
    }

    /**
     * Determines whether the word is a theta-drome for a given angle.
     * @param {string} word - The word.
     * @param {number} theta - The rotation angle.
     * @returns {boolean} - True if the word is a theta-drome.
     * @throws {WordError} - If the angle is invalid.
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