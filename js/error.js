class WordError extends Error {
    constructor(message) {
        super(message);
        this.name = "WordError";
    }

    // Static method for an invalid word error
    static invalidWord() {
        return new WordError("A word must contain at least 4 valid letters.");
    }

    // Static method for an invalid letter in the word
    static invalidLetter(letter) {
        return new WordError(`Invalid letter "${letter}" in the word. Allowed letters are 'u', 'd', 'l', 'r'.`);
    }

    // Static method for an out-of-bounds index error
    static invalidIndex(index) {
        return new WordError(`Index ${index} is out of bounds.`);
    }

    // Static method for invalid range of indices
    static invalidIndices(index1, index2) {
        return new WordError(`Indices ${index1} and ${index2} are out of bounds or invalid.`);
    }

    // Static method for invalid rotation angle
    static invalidRotation(angle) {
        return new WordError(`Invalid rotation angle ${angle}. Only multiples of 90 are allowed.`);
    }
}

export default WordError;