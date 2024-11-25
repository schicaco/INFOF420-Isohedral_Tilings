import BoundaryWordError from '../error.js';

/**
 * Constants for letter direction and rotations.
 */
const ALPHABET = new Map([
    ['u', [0, 1]],
    ['d', [0, -1]],
    ['l', [-1, 0]],
    ['r', [1, 0]],
]);

const ROTATIONS = new Map([
    ['u', { 90: 'r', 180: 'd', 270: 'l' }],
    ['d', { 90: 'l', 180: 'u', 270: 'r' }],
    ['l', { 90: 'u', 180: 'r', 270: 'd' }],
    ['r', { 90: 'd', 180: 'l', 270: 'u' }],
]);

/**
 * Class representing a boundary word and its associated operations.
 */
class BoundaryWord {
    /**
     * Constructs a BoundaryWord instance with the given word, converted to lowercase.
     * @param {string} word - The input word.
     * @throws {BoundaryWordError} - If the word is invalid.
     */
    constructor(word) {
        if (!word || typeof word !== 'string' || word.length < 4) {
            throw new BoundaryWordError.invalidWord();
        }
        this.word = word.toLowerCase();

        if (!this.isWordInAlphabet()) {
            throw new BoundaryWordError.invalidLetter();
        }
    }

    /**
     * Validates if all letters in the word belong to the defined ALPHABET.
     * @returns {boolean} - True if all letters are valid, otherwise false.
     */
    isWordInAlphabet() {
        return [...this.word].every(letter => ALPHABET.has(letter));
    }

    /**
     * Retrieves the stored word in lowercase.
     * @returns {string} - The word.
     */
    getWord() {
        return this.word;
    }

    /**
     * Retrieves a specific letter by its index.
     * @param {number} index - The index of the desired letter.
     * @returns {string} - The letter at the specified index.
     * @throws {BoundaryWordError} - If the index is out of bounds.
     */
    getLetter(index) {
        if (index < 0 || index >= this.word.length) {
            throw new BoundaryWordError.invalidIndex(index);
        }
        return this.word[index];
    }

    /**
     * Rotates a letter by a specified angle.
     * @param {string} letter - The letter to rotate.
     * @param {number} theta - The rotation angle (90, 180, 270).
     * @returns {string} - The rotated letter.
     * @throws {BoundaryWordError} - If the rotation angle or letter is invalid.
     */
    static rotateLetter(letter, theta) {
        if (theta % 360 === 0) return letter;
        const rotation = ROTATIONS.get(letter)?.[theta];
        if (!rotation) {
            throw new BoundaryWordError.invalidRotation(theta);
        }
        return rotation;
    }

    /**
     * Computes the complement of a letter (180-degree rotation).
     * @param {string} letter - The letter to complement.
     * @returns {string} - The complemented letter.
     */
    static complementLetter(letter) {
        return this.rotateLetter(letter, 180);
    }

    /**
     * Rotates the entire word by a specified angle.
     * @param {number} theta - The rotation angle (90, 180, 270).
     * @returns {string} - The rotated word.
     */
    rotateWord(theta) {
        return [...this.word].map(letter => BoundaryWord.rotateLetter(letter, theta)).join('');
    }

    /**
     * Computes the complement of the entire word.
     * @returns {string} - The complemented word.
     */
    complementWord() {
        return this.rotateWord(180);
    }

    /**
     * Reverses the word.
     * @returns {string} - The reversed word.
     */
    reverseWord() {
        return [...this.word].reverse().join('');
    }

    /**
     * Returns the backtrack of the word (equal to the reversed word).
     * @returns {string} - The backtracked word.
     */
    backtrackWord() {
        return this.reverseWord();
    }

    /**
     * Extracts a substring (factor) of the word.
     * @param {number} i - Start index (1-based).
     * @param {number} j - End index (1-based).
     * @returns {string} - The extracted factor.
     * @throws {BoundaryWordError} - If indices are invalid.
     */
    getFactor(i, j) {
        if (i < 1 || j > this.word.length || i > j) {
            throw new BoundaryWordError.invalidIndices(i, j);
        }
        return this.word.slice(i - 1, j);
    }

    /**
     * Checks if a substring is a prefix of the word.
     * @param {string} factor - The substring to check.
     * @returns {boolean} - True if the substring is a prefix, otherwise false.
     */
    isPrefix(factor) {
        return this.word.startsWith(factor);
    }

    /**
     * Checks if a substring is a suffix of the word.
     * @param {string} factor - The substring to check.
     * @returns {boolean} - True if the substring is a suffix, otherwise false.
     */
    isSuffix(factor) {
        return this.word.endsWith(factor);
    }

    /**
     * Checks if a substring is an affix (prefix or suffix) of the word.
     * @param {string} factor - The substring to check.
     * @returns {boolean} - True if the substring is an affix, otherwise false.
     */
    isAffix(factor) {
        return this.isPrefix(factor) || this.isSuffix(factor);
    }

    /**
     * Checks if a substring is a middle (not an affix) of the word.
     * @param {string} factor - The substring to check.
     * @returns {boolean} - True if the substring is in the middle, otherwise false.
     */
    isMiddle(factor) {
        return this.word.includes(factor) && !this.isAffix(factor);
    }

    /**
     * Finds the center of the word.
     * @returns {string} - The center of the word (1 or 2 letters).
     */
    findCenter() {
        const mid = Math.floor(this.word.length / 2);
        return this.word.length % 2 === 0
            ? this.word.slice(mid - 1, mid + 1)
            : this.word.charAt(mid);
    }

    /**
     * Checks if the word is a Θ-drome.
     * @param {number} theta - The rotation angle (0, 90, 180, 270).
     * @returns {boolean} - True if the word is a Θ-drome, otherwise false.
     * @throws {BoundaryWordError} - If the rotation angle is invalid.
     */
    isThetaDrome(theta) {
        if (![0, 90, 180, 270].includes(theta)) {
            throw new BoundaryWordError.invalidRotation(theta);
        }
        const half = Math.floor(this.word.length / 2);
        const firstHalf = this.word.slice(0, half);
        const secondHalf = this.word.slice(-half);
        const rotatedFirstHalf = [...firstHalf]
            .map(letter => BoundaryWord.rotateLetter(letter, theta + 180))
            .join('');
        return secondHalf === rotatedFirstHalf;
    }

    /**
     * Checks if the word is a palindrome.
     * @returns {boolean} - True if the word is a palindrome, otherwise false.
     */
    isPalindrome() {
        return this.word === this.reverseWord();
    }
}

export default BoundaryWord;