import Word from '../modules/word';
import WordError from '../core/wordError';
import { DIRECTION } from '../constants';

describe('Word Class', () => {
    let word;

    beforeEach(() => {
        word = Word.create('uldr');
    });

    describe('Constructor', () => {
        test('should create a Word instance for valid input', () => {
            expect(Word.create('uldr')).toBe('uldr');
        });

        test('should throw INVALID_TYPE error for non-string input', () => {
            expect(() => Word.create(1234)).toThrow(WordError.INVALID_TYPE);
        });

        test('should throw INVALID_LENGTH error for input shorter than 4 characters', () => {
            expect(() => Word.create('ul')).toThrow(WordError.INVALID_LENGTH);
        });

        test('should throw INVALID_WORD error for invalid directions', () => {
            expect(() => Word.create('abcd')).toThrow(WordError.INVALID_WORD);
        });
    });

    describe('isValidWord', () => {
        test('should return true for a valid word', () => {
            expect(Word.isValidWord('uldr')).toBe(true);
        });

        test('should return false for a word with invalid directions', () => {
            expect(Word.isValidWord('abcd')).toBe(false);
        });
    });

    describe('getLetter', () => {
        test('should handle positive indices', () => {
            expect(Word.getLetter(word, 0)).toBe('u');
            expect(Word.getLetter(word, 1)).toBe('l');
            expect(Word.getLetter(word, 2)).toBe('d');
            expect(Word.getLetter(word, 3)).toBe('r');
        });

        test('should handle negative indices', () => {
            expect(Word.getLetter(word, -1)).toBe('r');
            expect(Word.getLetter(word, -2)).toBe('d');
            expect(Word.getLetter(word, -3)).toBe('l');
            expect(Word.getLetter(word, -4)).toBe('u');
        });

        test('should throw INVALID_INDEX error for an out-of-range index', () => {
            expect(() => Word.getLetter(word, 4)).toThrow(WordError.INVALID_INDEX);
        });
    });

    describe('rotateLetter', () => {
        test('should correctly rotate a letter', () => {
            expect(Word.rotateLetter('u', 0)).toBe(DIRECTION.UP);
            expect(Word.rotateLetter('u', 90)).toBe(DIRECTION.LEFT);
            expect(Word.rotateLetter('u', 180)).toBe(DIRECTION.DOWN);
            expect(Word.rotateLetter('u', 270)).toBe(DIRECTION.RIGHT);

            expect(Word.rotateLetter('d', 0)).toBe(DIRECTION.DOWN);
            expect(Word.rotateLetter('d', 90)).toBe(DIRECTION.RIGHT);
            expect(Word.rotateLetter('d', 180)).toBe(DIRECTION.UP);
            expect(Word.rotateLetter('d', 270)).toBe(DIRECTION.LEFT);

            expect(Word.rotateLetter('l', 0)).toBe(DIRECTION.LEFT);
            expect(Word.rotateLetter('l', 90)).toBe(DIRECTION.DOWN);
            expect(Word.rotateLetter('l', 180)).toBe(DIRECTION.RIGHT);
            expect(Word.rotateLetter('l', 270)).toBe(DIRECTION.UP);

            expect(Word.rotateLetter('r', 0)).toBe(DIRECTION.RIGHT);
            expect(Word.rotateLetter('r', 90)).toBe(DIRECTION.UP);
            expect(Word.rotateLetter('r', 180)).toBe(DIRECTION.LEFT);
            expect(Word.rotateLetter('r', 270)).toBe(DIRECTION.DOWN);
        });

        test('should handle rotations greater than 360 degrees', () => {
            expect(Word.rotateLetter('u', 450)).toBe(DIRECTION.LEFT); // 450 % 360 = 90
        });

        test('should throw INVALID_ANGLE for non-90-degree rotations', () => {
            expect(() => Word.rotateLetter('u', 45)).toThrow(WordError.INVALID_ANGLE);
        });

        test('should throw INVALID_LETTER for an invalid letter', () => {
            expect(() => Word.rotateLetter('x', 90)).toThrow(WordError.INVALID_LETTER);
        });
    });

    describe('rotateWord', () => {
        test('should correctly rotate an entire word', () => {
            expect(Word.rotateWord(word, 0)).toBe('uldr');
            expect(Word.rotateWord(word, 90)).toBe('ldru');
            expect(Word.rotateWord(word, 180)).toBe('drul');
            expect(Word.rotateWord(word, 270)).toBe('ruld');
        });

        test('should throw INVALID_ANGLE for non-90-degree rotations', () => {
            expect(() => Word.rotateWord(word, 45)).toThrow(WordError.INVALID_ANGLE);
        });
    });

    describe('complementLetter', () => {
        test('should return the complement of a letter', () => {
            expect(Word.complementLetter('u')).toBe(DIRECTION.DOWN);
            expect(Word.complementLetter('d')).toBe(DIRECTION.UP);
            expect(Word.complementLetter('l')).toBe(DIRECTION.RIGHT);
            expect(Word.complementLetter('r')).toBe(DIRECTION.LEFT);
        });
    });

    describe('complementWord', () => {
        test('should return the complement of the entire word', () => {
            const complement = Word.complementWord(word);
            expect(complement).toBe('drul');
        });
    });

    describe('reverseWord', () => {
        test('should reverse the word', () => {
            const reverse = Word.reverseWord(word);
            expect(reverse).toBe('rdlu');
        });
    });

    describe('backtrackWord', () => {
        test('should return the complement of the reversed word', () => {
            const backtrack = Word.backtrackWord(word);
            expect(backtrack).toBe('lurd');
        });
    });

    describe('getFactor', () => {
        test('should return the correct factor for a given pair of indices', () => {
            expect(Word.getFactor(word, 1, 1)).toBe('u');
            expect(Word.getFactor(word, 2, 2)).toBe('l');
            expect(Word.getFactor(word, 3, 3)).toBe('d');
            expect(Word.getFactor(word, 4, 4)).toBe('r');

            expect(Word.getFactor(word, 1, 2)).toBe('ul');
            expect(Word.getFactor(word, 2, 3)).toBe('ld');
            expect(Word.getFactor(word, 3, 4)).toBe('dr');

            expect(Word.getFactor(word, 1, 3)).toBe('uld');
            expect(Word.getFactor(word, 2, 4)).toBe('ldr');

            expect(Word.getFactor(word, 1, 4)).toBe('uldr');
        });

        test('should throw INVALID_INDEX for out-of-range indices', () => {
            expect(() => Word.getFactor(word, 0, 1)).toThrow(WordError.INVALID_INDEX);
            expect(() => Word.getFactor(word, 2, 1)).toThrow(WordError.INVALID_INDEX);
            expect(() => Word.getFactor(word, 1, 5)).toThrow(WordError.INVALID_INDEX);
        });
    });

    describe('prefix, suﬃx, aﬃx, middle, and center', () => {
        test('should identify prefix', () => {
            expect(Word.isPrefix(word, 'ul')).toBe(true);
            expect(Word.isPrefix(word, 'dr')).toBe(false);
        });
    
        test('should identify suffix', () => {
            expect(Word.isSuffix(word, 'dr')).toBe(true);
            expect(Word.isSuffix(word, 'ul')).toBe(false);
        });
    
        test('should identify affix', () => {
            expect(Word.isAffix(word, 'ul')).toBe(true);      // Prefix
            expect(Word.isAffix(word, 'dr')).toBe(true);      // Suffix
            expect(Word.isAffix(word, 'ld')).toBe(false);     // Neither
        });

        test('should identify middle', () => {
            expect(Word.isMiddle(word, 'ld')).toBe(true);     // Middle
            expect(Word.isMiddle(word, 'ul')).toBe(false);    // Affix
            expect(Word.isMiddle(word, 'dr')).toBe(false);    // Affix
        });
    
        test('should identify center', () => {
            expect(Word.isCenter(word, 'ld')).toBe(true);     // Center
            expect(Word.isCenter(word, 'ul')).toBe(false);    // Not the center
            expect(Word.isCenter(word, 'dr')).toBe(false);    // Not the center
        });

        test('should find the center', () => {
            expect(Word.findCenter(word)).toBe('ld');
        });
    });

    describe('period, composite, and primitive', () => {
        let periodicWord;;

        beforeEach(() => {
            periodicWord = Word.create('ururur');  // Example word for testing
        });

        test('should check if the word is a period of another word', () => {
            expect(Word.isPeriod(periodicWord, 'ur')).toBe(true);
            expect(Word.isPeriod(periodicWord, 'ru')).toBe(false);
        });

        test('should check if the word is composite', () => {
            expect(Word.isComposite('ururur')).toBe(true);  // ur is repeated 3 times
            expect(Word.isComposite('ur')).toBe(false);  // ur is not composite
        });

        test('should check if the word is primitive', () => {
            expect(Word.isPrimitive('ururur')).toBe(false);  // ururur is composite
            expect(Word.isPrimitive('ur')).toBe(true);  // ur is primitive
        });
    });

    describe('is theta-drome', () => {
        test('should return true for a 0-drome, and false for others', () => {
            const word = Word.create('ulrd');
            const otherWord = Word.create('uldr');
            expect(Word.isThetaDrome(word, 0)).toBe(true);
            expect(Word.isThetaDrome(otherWord, 0)).toBe(false);
        });

        test('should return true for a 90-drome, and false for others', () => {
            const word = Word.create('ulur');
            const otherWord = Word.create('uldr');
            expect(Word.isThetaDrome(word, 90)).toBe(true);
            expect(Word.isThetaDrome(otherWord, 90)).toBe(false);
        });

        test('should return true for a 180-drome, and false for others', () => {
            const word = Word.create('ullu');
            const otherWord = Word.create('uldr');
            expect(Word.isThetaDrome(word, 180)).toBe(true);
            expect(Word.isThetaDrome(otherWord, 180)).toBe(false);
        });

        test('should return true for a 270-drome, and false for others', () => {
            const word = Word.create('uldl');
            const otherWord = Word.create('uldr');
            expect(Word.isThetaDrome(word, 270)).toBe(true);
            expect(Word.isThetaDrome(otherWord, 270)).toBe(false);
        });

        test('should throw INVALID_ANGLE for non-90-degree angles', () => {
            expect(() => Word.isThetaDrome(word, 45)).toThrow(WordError.INVALID_ANGLE);
        });
    });

    describe('isPalindrome', () => {
        test('should return true for a palindrome, false for others', () => {
            const word = Word.create('rddr');
            const otherWord = Word.create('uldr');
            expect(Word.isPalindrome(word)).toBe(true);
            expect(Word.isPalindrome(otherWord)).toBe(false);
        });
    });
});