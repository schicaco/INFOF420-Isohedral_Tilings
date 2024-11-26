import BoundaryWordError from '../error';
import BoundaryWord from '../modules/boundaryWord.js';

describe('BoundaryWord Class', () => {
    // Constructor Tests
    describe('Constructor', () => {
        test('valid word', () => {
            const word = new BoundaryWord('ldru');
            expect(word.getWord()).toBe('ldru');
        });

        test('invalid word (empty string)', () => {
            expect(() => new BoundaryWord('')).toThrow(BoundaryWordError.invalidWord());
        });

        test('invalid word (too short)', () => {
            expect(() => new BoundaryWord('ldr')).toThrow(BoundaryWordError.invalidWord());
        });

        test('invalid word (non-string)', () => {
            // @ts-expect-error: Testing with a non-string input
            expect(() => new BoundaryWord(123)).toThrow(BoundaryWordError.invalidWord());
        });

        test('invalid word (invalid letters)', () => {
            expect(() => new BoundaryWord('ldrx')).toThrow(BoundaryWordError.invalidLetter());
        });
    });

    // Instance Method Tests
    describe('Instance Methods', () => {
        let word;

        beforeEach(() => {
            word = new BoundaryWord('ldru');
        });

        test('getLetter: valid index', () => {
            expect(word.getLetter(0)).toBe('l');
            expect(word.getLetter(3)).toBe('u');
        });

        test('getLetter: invalid index (negative)', () => {
            expect(() => word.getLetter(-1)).toThrow(BoundaryWordError.invalidIndex(-1));
        });

        test('getLetter: invalid index (out of range)', () => {
            expect(() => word.getLetter(4)).toThrow(BoundaryWordError.invalidIndex(4));
        });

        test('rotateWord: valid rotation', () => {
            expect(word.rotateWord(90)).toBe('uldr');
            expect(word.rotateWord(180)).toBe('ruld');
        });

        test('reverseWord: reverse word', () => {
            expect(word.reverseWord()).toBe('urdl');
        });

        test('backtrackWord: backtracked word', () => {
            expect(word.backtrackWord()).toBe('urdl');
        });

        test('getFactor: valid factor', () => {
            const longWord = new BoundaryWord('uuulruuu');
            expect(longWord.getFactor(1, 3)).toBe('uuu');
            expect(longWord.getFactor(4, 6)).toBe('lru');
        });

        test('getFactor: invalid indices', () => {
            const longWord = new BoundaryWord('uuulruuu');
            expect(() => longWord.getFactor(0, 3)).toThrow(BoundaryWordError.invalidIndices(0, 3));
            expect(() => longWord.getFactor(4, 10)).toThrow(BoundaryWordError.invalidIndices(4, 10));
            expect(() => longWord.getFactor(6, 5)).toThrow(BoundaryWordError.invalidIndices(6, 5));
        });

        test('findCenter: odd-length word', () => {
            const oddWord = new BoundaryWord('uuulruu');
            expect(oddWord.findCenter()).toBe('l');
        });

        test('findCenter: even-length word', () => {
            const evenWord = new BoundaryWord('uuulruuu');
            expect(evenWord.findCenter()).toBe('lr');
        });
    });

    // Static Method Tests
    describe('Static Methods', () => {
        test('rotateLetter: valid rotations', () => {
            expect(BoundaryWord.rotateLetter('u', 90)).toBe('r');
            expect(BoundaryWord.rotateLetter('d', 180)).toBe('u');
            expect(BoundaryWord.rotateLetter('r', 270)).toBe('u');
        });

        test('rotateLetter: invalid rotation angle', () => {
            expect(() => BoundaryWord.rotateLetter('u', 45)).toThrow(BoundaryWordError.invalidRotation(45));
        });

        test('complementLetter: valid complement', () => {
            expect(BoundaryWord.complementLetter('u')).toBe('d');
            expect(BoundaryWord.complementLetter('l')).toBe('r');
        });
    });

    // Special Case Tests
    describe('Special Cases', () => {
        test('isPalindrome: valid palindrome (even length)', () => {
            const word = new BoundaryWord('uurrdlldrruu');
            expect(word.isPalindrome()).toBe(true);
        });

        test('isPalindrome: invalid palindrome', () => {
            const word = new BoundaryWord('uurrduldrruu');
            expect(word.isPalindrome()).toBe(false);
        });

        test('isThetaDrome: valid 90-drome', () => {
            const word = new BoundaryWord('lddr');
            expect(word.isThetaDrome(90)).toBe(true);
        });

        test('isThetaDrome: invalid 90-drome', () => {
            const word = new BoundaryWord('uldr');
            expect(word.isThetaDrome(90)).toBe(false);
        });

        test('isThetaDrome: invalid rotation angle', () => {
            const word = new BoundaryWord('ulul');
            expect(() => word.isThetaDrome(45)).toThrow(BoundaryWordError.invalidRotation(45));
        });

        test('isThetaDrome: invalid for odd-length word', () => {
            const word = new BoundaryWord('ululu');
            expect(word.isThetaDrome(90)).toBe(false);
        });
    });

    // Prefix, Suffix, and Affix Tests
    describe('Prefix, Suffix, and Affix Methods', () => {
        let word;

        beforeEach(() => {
            word = new BoundaryWord('uuulruuu');
        });

        test('isPrefix: valid prefixes', () => {
            expect(word.isPrefix('uuu')).toBe(true);
            expect(word.isPrefix('uuulr')).toBe(true);
        });

        test('isPrefix: invalid prefix', () => {
            expect(word.isPrefix('lru')).toBe(false);
        });

        test('isSuffix: valid suffixes', () => {
            expect(word.isSuffix('uuu')).toBe(true);
            expect(word.isSuffix('lruuu')).toBe(true);
        });

        test('isSuffix: invalid suffix', () => {
            expect(word.isSuffix('uuul')).toBe(false);
        });

        test('isAffix: valid affixes', () => {
            expect(word.isAffix('uuu')).toBe(true);
            expect(word.isAffix('uuul')).toBe(true);
            expect(word.isAffix('lruuu')).toBe(true);
        });

        test('isAffix: invalid affix', () => {
            expect(word.isAffix('lur')).toBe(false);
        });

        test('isMiddle: valid middle', () => {
            expect(word.isMiddle('lr')).toBe(true);
        });

        test('isMiddle: invalid middle', () => {
            expect(word.isMiddle('uuu')).toBe(false); // 'uuu' is an affix
            expect(word.isMiddle('uuul')).toBe(false); // 'uuul' is a prefix
        });
    });
});