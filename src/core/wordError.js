class WordError extends Error {
    constructor(message) {
        super(message);
        this.name = 'WordError';
    }

    static get INVALID_TYPE() {
        return 'Invalid type';
    }

    static get INVALID_LENGTH() {
        return 'Invalid length';
    }

    static get INVALID_WORD() {
        return 'Invalid word';
    }

    static get INVALID_INDEX() {
        return 'Invalid index';
    }

    static get INVALID_LETTER() {
        return 'Invalid letter';
    }

    static get INVALID_ANGLE() {
        return 'Invalid angle';
    }

    static get INVALID_REPETITION() {
        return 'Invalid repetition';
    }

    static get INVALID_PARENTHESIS() {
        return 'Invalid parenthesis';
    }
}

export default WordError;