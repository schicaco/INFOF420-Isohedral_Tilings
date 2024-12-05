import Factor from "../modules/factor";
import Word from "../modules/word";
import { WordError, FactorError } from "../core/error";

describe("Word class tests with directions u, l, d, r", () => {
    const validWord = "uldr"; // A valid word with valid directions
    const invalidWord = "wxyz"; // Invalid word with invalid directions

    describe("create", () => {
        it("should create a valid word", () => {
            expect(Word.create(validWord)).toBe(validWord);
        });

        it("should throw INVALID_TYPE for non-string input", () => {
            expect(() => Word.create(123)).toThrow(WordError.INVALID_TYPE);
        });

        it("should throw INVALID_LENGTH for short strings", () => {
            expect(() => Word.create("ul")).toThrow(WordError.INVALID_LENGTH);
        });

        it("should throw INVALID_WORD for invalid characters", () => {
            expect(() => Word.create(invalidWord)).toThrow(WordError.INVALID_WORD);
        });
    });

    describe("isValidWord", () => {
        it("should return true for a valid word", () => {
            expect(Word.isValidWord(validWord)).toBe(true);
        });

        it("should return false for an invalid word", () => {
            expect(Word.isValidWord(invalidWord)).toBe(false);
        });
    });

    describe("isEvenLength", () => {
        it("should return true for an even-length word", () => {
            expect(Word.isEvenLength("abcd")).toBe(true);
        });

        it("should return false for an odd-length word", () => {
            expect(Word.isEvenLength("abc")).toBe(false);
        });
    });

    describe("getCenter", () => {
        it("should return the center indices for an even-length word", () => {
            const center = Word.getCenter("abcd");
            expect(Factor.areEqual(center, new Factor("abcd", 1, 2))).toBe(true);
        });

        it("should return the center index for an odd-length word", () => {
            const center = Word.getCenter("abc");
            expect(Factor.areEqual(center, new Factor("abc", 1, 1))).toBe(true);
        });
    });

    describe("getLetter", () => {
        it("should return the correct letter for a positive index", () => {
            expect(Word.getLetter(validWord, 0)).toBe("u");
            expect(Word.getLetter(validWord, 1)).toBe("l");
            expect(Word.getLetter(validWord, 2)).toBe("d");
            expect(Word.getLetter(validWord, 3)).toBe("r");
        });

        it("should return the correct letter for a negative index", () => {
            expect(Word.getLetter(validWord, -1)).toBe("r");
            expect(Word.getLetter(validWord, -2)).toBe("d");
            expect(Word.getLetter(validWord, -3)).toBe("l");
            expect(Word.getLetter(validWord, -4)).toBe("u");
        });

        it("should throw INVALID_INDEX for an out-of-range index", () => {
            expect(() => Word.getLetter(validWord, 10)).toThrow(WordError.INVALID_INDEX);
            expect(() => Word.getLetter(validWord, -5)).toThrow(WordError.INVALID_INDEX);
        });
    });

    describe("rotateLetter", () => {
        it("should correctly rotate a letter by 90 degrees", () => {
            expect(Word.rotateLetter("u", 0)).toBe("u");
            expect(Word.rotateLetter("l", 0)).toBe("l");
            expect(Word.rotateLetter("d", 0)).toBe("d");
            expect(Word.rotateLetter("r", 0)).toBe("r");

            expect(Word.rotateLetter("u", 90)).toBe("l");
            expect(Word.rotateLetter("l", 90)).toBe("d");
            expect(Word.rotateLetter("d", 90)).toBe("r");
            expect(Word.rotateLetter("r", 90)).toBe("u");

            expect(Word.rotateLetter("u", 180)).toBe("d");
            expect(Word.rotateLetter("l", 180)).toBe("r");
            expect(Word.rotateLetter("d", 180)).toBe("u");
            expect(Word.rotateLetter("r", 180)).toBe("l");

            expect(Word.rotateLetter("u", 270)).toBe("r");
            expect(Word.rotateLetter("l", 270)).toBe("u");
            expect(Word.rotateLetter("d", 270)).toBe("l");
            expect(Word.rotateLetter("r", 270)).toBe("d");
        });

        it("should throw INVALID_ANGLE for non-multiples of 90", () => {
            expect(() => Word.rotateLetter("u", 45)).toThrow(WordError.INVALID_ANGLE);
        });
    });

    describe("rotateWord", () => {
        const rotatedWord90 = "ldru";

        it("should correctly rotate a word by 90 degrees", () => {
            expect(Word.rotateWord(validWord, 90)).toBe(rotatedWord90);
        });

        it("should throw INVALID_ANGLE for non-multiples of 90", () => {
            expect(() => Word.rotateWord(validWord, 45)).toThrow(WordError.INVALID_ANGLE);
        });
    });

    describe("reverseWord", () => {
        it("should correctly reverse the word", () => {
            expect(Word.reverseWord(validWord)).toBe("rdlu");
        });
    });

    describe("complementLetter", () => {
        it("should correctly complement the letter", () => {
            expect(Word.complementLetter("u")).toBe("d");
            expect(Word.complementLetter("l")).toBe("r");
            expect(Word.complementLetter("d")).toBe("u");
            expect(Word.complementLetter("r")).toBe("l");
        });
    });

    describe("complementWord", () => {
        it("should correctly complement the word", () => {
            expect(Word.complementWord(validWord)).toBe("drul");
        });
    });

    describe("backtrackWord", () => {
        it("should correctly backtrack a word", () => {
            expect(Word.backtrackWord(validWord)).toBe("lurd");
        });
    });

    describe("getFactor", () => {
        it("should return a valid factor object", () => {
            const factor = Word.getFactor(validWord, 1, 2);
            expect(factor.value).toBe("ld");
            expect(factor.start).toBe(1);
            expect(factor.end).toBe(2);
        });

        it("should throw an error for invalid indices", () => {
            expect(() => Word.getFactor(validWord, -1, 5)).toThrow(FactorError.INVALID_INDICES);
        });
    });

    describe("isPrefix and isSuffix", () => {
        it("should correctly identify prefixes", () => {
            const factor = Word.getFactor(validWord, 0, 1); // "ul"
            expect(Word.isPrefix(validWord, factor)).toBe(true);
        });

        it("should correctly identify suffixes", () => {
            const factor = Word.getFactor(validWord, 2, 3); // "dr"
            expect(Word.isSuffix(validWord, factor)).toBe(true);
        });
    });

    describe("isPalindrome", () => {
        it("should return true for a palindrome word", () => {
            expect(Word.isPalindrome("ulu")).toBe(true);
            expect(Word.isPalindrome("ullu")).toBe(true);
        });

        it("should return false for a non-palindrome word", () => {
            expect(Word.isPalindrome(validWord)).toBe(false);
        });
    });

    describe("isComposite and isPrimitive", () => {
        it("should correctly identify composite words", () => {
            expect(Word.isComposite("ulululul")).toBe(true);
        });

        it("should correctly identify primitive words", () => {
            expect(Word.isPrimitive(validWord)).toBe(true);
        });
    });

    describe("isThetaDrome", () => {
        it("should correctly identify theta-dromes", () => {
            expect(Word.isThetaDrome("ulur", 90)).toBe(true);
        });

        it("should throw INVALID_ANGLE for non-multiples of 90", () => {
            expect(() => Word.isThetaDrome(validWord, 45)).toThrow(WordError.INVALID_ANGLE);
        });
    });
});