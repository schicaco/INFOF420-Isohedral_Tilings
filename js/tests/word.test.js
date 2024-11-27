import WordError from '../error';
import Word from '../modules/word';

describe('Word Class', () => {
    // Constructor Tests
    describe('Constructor', () => {
        test('valid word', () => {
            const word = new Word('udlr');
            expect(word.getWord()).toBe('udlr');
        });

        test('invalid word (empty string)', () => {
            expect(() => new Word('')).toThrow(WordError.invalidWord());
        });

        test('invalid word (too short)', () => {
            expect(() => new Word('u')).toThrow(WordError.invalidWord()); //Admissibility of word
        });

        test('invalid word (non-string)', () => {
            // @ts-expect-error: Testing with a non-string input
            expect(() => new Word(123)).toThrow(WordError.invalidWord());
        });

        test('invalid word (invalid letters)', () => {
            expect(() => new Word('udlx')).toThrow(WordError.invalidLetter());
        });
    });

    // Instance Method Tests
    describe('Instance Methods', () => {
        let word;
        let longWord;

        beforeEach(() => {
            word = new Word('udlr');
            longWord = new Word('uuulruuu');
        });

        test('getLetter: valid index', () => {
            expect(word.getLetter(0)).toBe('u');
            expect(word.getLetter(1)).toBe('d');
            expect(word.getLetter(2)).toBe('l');
            expect(word.getLetter(3)).toBe('r');
        });

        test('getLetter: invalid index (negative)', () => {
            expect(() => word.getLetter(-1)).toThrow(WordError.invalidIndex(-1));
        });

        test('getLetter: invalid index (out of range)', () => {
            expect(() => word.getLetter(4)).toThrow(WordError.invalidIndex(4));
        });

        test('rotateWord: valid rotation', () => {
            expect(word.rotateWord(0)).toBe('udlr');
            expect(word.rotateWord(90)).toBe('lrdu');
            expect(word.rotateWord(180)).toBe('durl');
            expect(word.rotateWord(270)).toBe('rlud');
        });

        test('rotateWord: invalid rotation angle', () => {
            expect(() => word.rotateWord(45)).toThrow(WordError.invalidRotation(45));
        });

        test('complementWord: complemented word', () => {
            expect(word.complementWord()).toBe('durl');
        });

        test('reverseWord: reverse word', () => {
            expect(word.reverseWord()).toBe('rldu');
        });

        test('backtrackWord: backtracked word', () => {
            expect(word.backtrackWord()).toBe('lrud');
        });

        test('getFactor: valid factor', () => {
            expect(longWord.getFactor(1, 3)).toBe('uuu');
            expect(longWord.getFactor(4, 6)).toBe('lru');
        });

        test('getFactor: invalid indices', () => {
            expect(() => longWord.getFactor(0, 3)).toThrow(WordError.invalidIndices(0, 3));
            expect(() => longWord.getFactor(4, 10)).toThrow(WordError.invalidIndices(4, 10));
            expect(() => longWord.getFactor(6, 5)).toThrow(WordError.invalidIndices(6, 5));
        });

        test('findCenter: odd-length word', () => {
            const oddWord = new Word('uuuluuu');
            expect(oddWord.findCenter()).toBe('l');
        });

        test('findCenter: even-length word', () => {
            const evenWord = new Word('uuulluuu');
            expect(evenWord.findCenter()).toBe('ll');
        });
    });

    // Static Method Tests
    describe('Static Methods', () => {
        test('rotateLetter: valid rotations', () => {
            expect(Word.rotateLetter('u', 0)).toBe('u');
            expect(Word.rotateLetter('u', 90)).toBe('l');
            expect(Word.rotateLetter('u', 180)).toBe('d');
            expect(Word.rotateLetter('u', 270)).toBe('r');

            expect(Word.rotateLetter('d', 0)).toBe('d');
            expect(Word.rotateLetter('d', 90)).toBe('r');
            expect(Word.rotateLetter('d', 180)).toBe('u');
            expect(Word.rotateLetter('d', 270)).toBe('l');

            expect(Word.rotateLetter('l', 0)).toBe('l');
            expect(Word.rotateLetter('l', 90)).toBe('d');
            expect(Word.rotateLetter('l', 180)).toBe('r');
            expect(Word.rotateLetter('l', 270)).toBe('u');

            expect(Word.rotateLetter('r', 0)).toBe('r');
            expect(Word.rotateLetter('r', 90)).toBe('u');
            expect(Word.rotateLetter('r', 180)).toBe('l');
            expect(Word.rotateLetter('r', 270)).toBe('d');
        });

        test('rotateLetter: invalid rotation angle', () => {
            expect(() => Word.rotateLetter('u', 45)).toThrow(WordError.invalidRotation(45));
        });

        test('complementLetter: valid complements', () => {
            expect(Word.complementLetter('u')).toBe('d');
            expect(Word.complementLetter('d')).toBe('u');
            expect(Word.complementLetter('l')).toBe('r');
            expect(Word.complementLetter('r')).toBe('l');
        });
    });

    // Special Case Tests
    describe('Special Cases', () => {
        test('isPalindrome: valid palindrome (even length)', () => {
            const word = new Word('uuulluuu');
            expect(word.isPalindrome()).toBe(true);
        });

        test('isPalindrome: valid palindrome (odd length)', () => {
            const word = new Word('uuuluuu');
            expect(word.isPalindrome()).toBe(true);
        });

        test('isPalindrome: invalid palindrome (even length)', () => {
            const word = new Word('uuulruuu');
            expect(word.isPalindrome()).toBe(false);
        });

        test('isPalindrome: invalid palindrome (odd length)', () => {
            const word = new Word('uudlruuu');
            expect(word.isPalindrome()).toBe(false);
        });

        test('isThetaDrome: valid 0-drome (even length)', () => {
            const word = new Word('udud');
            expect(word.isThetaDrome(0)).toBe(true);
        });

        test('isThetaDrome: valid 0-drome (odd length)', () => {
            const word = new Word('udlud');
            expect(word.isThetaDrome(0)).toBe(true);
        });

        test('isThetaDrome: invalid 0-drome (even length)', () => {
            const word = new Word('udlr');
            expect(word.isThetaDrome(0)).toBe(false);
        });

        test('isThetaDrome: invalid 0-drome (odd length)', () => {
            const word = new Word('udldu');
            expect(word.isThetaDrome(0)).toBe(false);
        });

        test('isThetaDrome: valid 90-drome (even length)', () => {
            const word = new Word('durl');
            expect(word.isThetaDrome(90)).toBe(true);
        });

        test('isThetaDrome: valid 90-drome (odd length)', () => {
            const word = new Word('dulrl');
            expect(word.isThetaDrome(90)).toBe(true);
        });

        test('isThetaDrome: invalid 90-drome (even length)', () => {
            const word = new Word('udrl');
            expect(word.isThetaDrome(90)).toBe(false);
        });

        test('isThetaDrome: invalid 90-drome (odd length)', () => {
            const word = new Word('udlrl');
            expect(word.isThetaDrome(90)).toBe(false);
        });

        test('isThetaDrome: valid 180-drome (even length)', () => {
            const word = new Word('uuulluuu');
            expect(word.isThetaDrome(180)).toBe(true);
        });

        test('isThetaDrome: valid 180-drome (odd length)', () => {
            const word = new Word('uuuluuu');
            expect(word.isThetaDrome(180)).toBe(true);
        });

        test('isThetaDrome: invalid 180-drome (even length)', () => {
            const word = new Word('uuulruuu');
            expect(word.isThetaDrome(180)).toBe(false);
        });

        test('isThetaDrome: invalid 180-drome (odd length)', () => {
            const word = new Word('uuudlruuu');
            expect(word.isThetaDrome(180)).toBe(false);
        });

        test('isThetaDrome: valid 270-drome (even length)', () => {
            const word = new Word('dulr');
            expect(word.isThetaDrome(270)).toBe(true);
        });

        test('isThetaDrome: valid 270-drome (odd length)', () => {
            const word = new Word('durlr');
            expect(word.isThetaDrome(270)).toBe(true);
        });

        test('isThetaDrome: invalid 270-drome (even length)', () => {
            const word = new Word('durl');
            expect(word.isThetaDrome(270)).toBe(false);
        });

        test('isThetaDrome: invalid 270-drome (odd length)', () => {
            const word = new Word('dulrl');
            expect(word.isThetaDrome(270)).toBe(false);
        });

        test('isThetaDrome: invalid rotation angle', () => {
            const word = new Word('udlr');
            expect(() => word.isThetaDrome(45)).toThrow(WordError.invalidRotation(45));
        });
    });

    // Prefix, Suffix, and Affix Tests
    describe('Prefix, Suffix, and Affix Methods', () => {
        let word;

        beforeEach(() => {
            word = new Word('uuulruuu');
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