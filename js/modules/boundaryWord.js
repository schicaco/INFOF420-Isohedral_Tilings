const ALPHABET = ['n', 'e', 's', 'w'];

class BoundaryWord {
    /**
     * Constructs a BoundaryWord instance with the given word, converted to lowercase.
     * @param {string} word - The input word.
     */
    constructor(word) {
        if (!word || typeof word !== 'string') {
            throw new Error("Invalid word: A non-empty string is required.");
        }
        this.word = word.toLowerCase(); // Stores the word in lowercase
    }

    /**
     * Checks if all letters in the word are within the defined ALPHABET.
     * @returns {boolean} - True if all letters are in the ALPHABET; false otherwise.
     */
    isWordInAlphabet() {
        return [...this.word].every(letter => ALPHABET.includes(letter));
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