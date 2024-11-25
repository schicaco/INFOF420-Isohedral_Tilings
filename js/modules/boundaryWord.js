const ALPHABET = new Map([
    ['u', [0, 1]],
    ['d', [0, -1]],
    ['l', [-1, 0]],
    ['r', [1, 0]],
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


}

export default BoundaryWord;