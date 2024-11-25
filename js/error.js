class BoundaryWordError extends Error {
    constructor(message) {
        super(message);
        this.name = "BoundaryWordError";
    }

    static invalidWord() {
        return new BoundaryWordError("A word of at least 4 letters is required.");
    }

    static invalidLetter(letter) {
        return new BoundaryWordError(`Invalid letter "${letter}" in the word.`);
    }

    static invalidIndex(index) {
        return new BoundaryWordError(`Index ${index} is out of bounds.`);
    }

    static invalidIndices(index1, index2) {
        return new BoundaryWordError(`Indices ${index1} and ${index2} are out of bounds.`);
    }

    static invalidRotation(angle) {
        return new BoundaryWordError(`Invalid rotation angle ${angle}.`);
    }
}

export default BoundaryWordError;