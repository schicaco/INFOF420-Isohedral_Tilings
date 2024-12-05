import { FactorError } from "../core/error";

class Factor {
    /**
     * Creates a Factor object.
     * @param {string} word - The word.
     * @param {number} start - The starting index of the factor.
     * @param {number} end - The ending index of the factor.
     * @throws {Error} If indices are invalid.
     */
    constructor(word, start, end) {
        if (!Factor.validateIndices(word, start, end)) {
            throw FactorError.INVALID_INDICES;
        }

        this._start = start;
        this._end = end;
        this._value = word.slice(start, end + 1);
    }

    /**
     * Returns the value of the factor.
     * @returns {string}
     */
    get value() {
        return this._value;
    }

    /**
     * Returns the starting index of the factor.
     * @returns {number}
     */
    get start() {
        return this._start;
    }

    /**
     * Returns the ending index of the factor.
     * @returns {number}
     */
    get end() {
        return this._end;
    }

    /**
     * Returns the length of the factor.
     * @returns {number}
     */
    get length() {
        return this._end - this._start + 1;
    }

    

    /**
     * Validates indices for factor creation.
     * @param {string} word - The word.
     * @param {number} start - The starting index.
     * @param {number} end - The ending index.
     * @returns {boolean} True if indices are valid, otherwise false.
     */
    static validateIndices(word, start, end) {
        return (
            typeof start === "number" &&
            typeof end === "number" &&
            start >= 0 &&
            end >= start &&
            end < word.length
        );
    }

    static areEqual(factor1, factor2) {
        if (!(factor1 instanceof Factor) || !(factor2 instanceof Factor)) {
            throw FactorError.INVALID_TYPE;
        }

        if (factor1.start !== factor2.start) {
            return false;
        } else if (factor1.end !== factor2.end) {
            return false;
        } else if (factor1.value !== factor2.value) {
            return false;
        }

        return true;
    }

    /**
     * Combines two factors into a single string.
     * @param {Factor} factor1 - The first factor.
     * @param {Factor} factor2 - The second factor.
     * @returns {Factor|null} Combined factor or null if not valid.
     */
    static combineFactors(factor1, factor2) {
        if (!(factor1 instanceof Factor) || !(factor2 instanceof Factor)) {
            throw FactorError.INVALID_TYPE;
        }

        if (factor1.end + 1 !== factor2.start) {
            throw FactorError.DISJOINT_FACTORS;
        }

        return new Factor(
            factor1.value + factor2.value,
            factor1.start,
            factor2.end
        );
    }

    toString() {
        return this._value;
    }
}

export default Factor;