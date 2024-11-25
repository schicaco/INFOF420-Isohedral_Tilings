const ALPHABET = new Map([
    ['u', [0, 1]],
    ['d', [0, -1]],
    ['l', [-1, 0]],
    ['r', [1, 0]],
]);

const ROTATIONS = new Map([
    ['u', { 90: 'l', 180: 'd', 270: 'r' }],
    ['d', { 90: 'r', 180: 'u', 270: 'l' }],
    ['l', { 90: 'd', 180: 'r', 270: 'u' }],
    ['r', { 90: 'u', 180: 'l', 270: 'd' }],
]);

class BoundaryWord {
    /**
     * Constructs a BoundaryWord instance with the given word, converted to lowercase.
     * @param {string} word - The input word.
     */
    constructor(word) {
        if (!word || word.length < 4 || typeof word !== 'string') {
            throw new Error("Invalid word: A string of at least 4 letters is required.");
        }
        this.word = word.toLowerCase(); // Stores the word in lowercase

        if (!this.isWordInAlphabet()) {
            throw new Error("Invalid word: All letters must be in the alphabet.");
        }
    }

    /**
     * Checks if all letters in the word are within the defined ALPHABET.
     * @returns {boolean} - True if all letters are in the ALPHABET; false otherwise.
     */
    isWordInAlphabet() {
        return [...this.word].every(letter => ALPHABET.has(letter));
    }

    /**
     * Retrieves the stored word.
     * @returns {string} - The word in lowercase.
     */
    getWord() {
        return this.word;
    }

    /**
     * Retrieves a letter at a specific index in the word.
     * @param {number} index - The index of the letter to retrieve.
     * @returns {string} - The letter at the specified index.
     * @throws {Error} - If the index is out of bounds.
     */
    getLetter(index) {
        if (index < 0 || index >= this.word.length) {
            throw new Error(`Index ${index} is out of bounds.`);
        }
        return this.word[index];
    }

    /**
     * Rotates a letter by Θ degrees counterclockwise.
     * @param {string} letter - The input letter.
     * @param {number} theta - The rotation angle (90, 180, or 270 degrees).
     * @returns {string} - The rotated letter.
     */
    static rotateLetter(letter, theta) {
        if (theta === 0) return letter;
        if (!ROTATIONS.has(letter) || !ROTATIONS.get(letter)[theta]) {
            throw new Error(`Invalid rotation angle ${theta} or letter ${letter}.`);
        }
        return ROTATIONS.get(letter)[theta];
    }

    /**
     * Computes the complement of a letter.
     * @param {string} letter - The input letter.
     * @returns {string} - The complement of the letter (180-degree rotation).
     */
    static complementLetter(letter) {
        return this.rotateLetter(letter, 180);
    }

    /**
     * Computes the rotation of the entire word by Θ degrees.
     * @param {number} theta - The rotation angle (90, 180, or 270 degrees).
     * @returns {string} - The rotated word.
     */
    rotateWord(theta) {
        return [...this.word].map(letter => BoundaryWord.rotateLetter(letter, theta)).join('');
    }

    /**
     * Computes the complement of the entire word.
     * @returns {string} - The complement of the word.
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
     * Computes the backtrack of the word.
     * @returns {string} - The backtracked word (equal to the reversed word in this context).
     */
    backtrackWord() {
        return this.reverseWord();
    }

    /**
     * Returns a factor of the word from index i to j (inclusive).
     * @param {number} i - Start index (1-based).
     * @param {number} j - End index (1-based).
     * @returns {string} - The factor of the word.
     * @throws {Error} - If indices are out of bounds or invalid.
     */
    getFactor(i, j) {
        if (i < 1 || j > this.word.length || i > j) {
            throw new Error(`Invalid indices: i = ${i}, j = ${j}.`);
        }
        return this.word.slice(i - 1, j);
    }

    /**
     * Checks if a factor is a prefix of the word.
     * @param {string} factor - The factor to check.
     * @returns {boolean} - True if the factor is a prefix; false otherwise.
     */
    isPrefix(factor) {
        return this.word.startsWith(factor);
    }

    /**
     * Checks if a factor is a suffix of the word.
     * @param {string} factor - The factor to check.
     * @returns {boolean} - True if the factor is a suffix; false otherwise.
     */
    isSuffix(factor) {
        return this.word.endsWith(factor);
    }

    /**
     * Checks if a factor is an affix (prefix or suffix) of the word.
     * @param {string} factor - The factor to check.
     * @returns {boolean} - True if the factor is an affix; false otherwise.
     */
    isAffix(factor) {
        return this.isPrefix(factor) || this.isSuffix(factor);
    }

    /**
     * Checks if a factor is a middle (not an affix) of the word.
     * @param {string} factor - The factor to check.
     * @returns {boolean} - True if the factor is a middle; false otherwise.
     */
    isMiddle(factor) {
        const prefix = this.isPrefix(factor);
        const suffix = this.isSuffix(factor);
        return !prefix && !suffix && this.word.includes(factor);
    }

    /**
     * Finds the center of the word.
     * @returns {string} - The center of the word (1 or 2 letters).
     */
    findCenter() {
        const length = this.word.length;
        if (length % 2 === 1) {
            return this.word.charAt(Math.floor(length / 2));
        } else {
            const mid = length / 2;
            return this.word.slice(mid - 1, mid + 1);
        }
    }
}

export default BoundaryWord;