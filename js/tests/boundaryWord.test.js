import BoundaryWordError from '../error';
import BoundaryWord from '../modules/BoundaryWord';

describe('BoundaryWord Class', () => {
    test('Constructor: valid word', () => {
        const word = new BoundaryWord('ldru');
        expect(word.getWord()).toBe('ldru');
    });

    test('Constructor: invalid word (empty string)', () => {
        expect(() => new BoundaryWord('')).toThrow(BoundaryWordError.invalidWord());
    });

    test('Constructor: invalid word (too short)', () => {
        expect(() => new BoundaryWord('ldr')).toThrow(BoundaryWordError.invalidWord());
    });

    test('Constructor: invalid word (non-string)', () => {
        // @ts-expect-error: Testing with a non-string input
        expect(() => new BoundaryWord(123)).toThrow(BoundaryWordError.invalidWord());
    });

    test('Constructor: invalid word (invalid letters)', () => {
        expect(() => new BoundaryWord('ldrx')).toThrow(BoundaryWordError.invalidLetter());
    });

    test('getLetter: valid index', () => {
        const word = new BoundaryWord('ldru');
        expect(word.getLetter(0)).toBe('l');
        expect(word.getLetter(3)).toBe('u');
    });

    test('getLetter: invalid index (negative)', () => {
        const word = new BoundaryWord('ldru');
        expect(() => word.getLetter(-1)).toThrow(BoundaryWordError.invalidIndex(-1));
    });

    test('getLetter: invalid index (out of range)', () => {
        const word = new BoundaryWord('ldru');
        expect(() => word.getLetter(4)).toThrow(BoundaryWordError.invalidIndex(4));
    });

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

    test('rotateWord: valid rotation', () => {
        const word = new BoundaryWord('uldr');
        expect(word.rotateWord(90)).toBe('ruld');
        expect(word.rotateWord(180)).toBe('drul');
    });

    test('complementWord: valid complement', () => {
        const word = new BoundaryWord('uldr');
        expect(word.complementWord()).toBe('drul');
    });

    test('reverseWord: reverse word', () => {
        const word = new BoundaryWord('uldr');
        expect(word.reverseWord()).toBe('rdlu');
    });

    test('backtrackWord: backtracked word', () => {
        const word = new BoundaryWord('uldr');
        expect(word.backtrackWord()).toBe('rdlu');
    });

    test('circular word transformation', () => {
        const word = new BoundaryWord('uldr');
        const rotated = word.rotateWord(90);
        expect(rotated).toBe('ruld');
    });

    test('getFactor: valid factor', () => {
        const word = new BoundaryWord('uuulruuu');
        expect(word.getFactor(1, 3)).toBe('uuu'); // Factor from index 1 to 3
        expect(word.getFactor(4, 6)).toBe('lru'); // Factor from index 4 to 6
    });

    test('getFactor: invalid indices', () => {
        const word = new BoundaryWord('uuulruuu');
        expect(() => word.getFactor(0, 3)).toThrow(BoundaryWordError.invalidIndices(0, 3));
        expect(() => word.getFactor(4, 10)).toThrow(BoundaryWordError.invalidIndices(4, 10));
        expect(() => word.getFactor(6, 5)).toThrow(BoundaryWordError.invalidIndices(6, 5));
    });

    test('isPrefix: valid prefixes', () => {
        const word = new BoundaryWord('uuulruuu');
        expect(word.isPrefix('uuu')).toBe(true); // 'uuu' is a prefix
        expect(word.isPrefix('uuulr')).toBe(true); // 'uuulr' is a prefix
    });

    test('isPrefix: invalid prefix', () => {
        const word = new BoundaryWord('uuulruuu');
        expect(word.isPrefix('lru')).toBe(false); // 'lru' is not a prefix
    });

    test('isSuffix: valid suffixes', () => {
        const word = new BoundaryWord('uuulruuu');
        expect(word.isSuffix('uuu')).toBe(true); // 'uuu' is a suffix
        expect(word.isSuffix('lruuu')).toBe(true); // 'lruuu' is a suffix
    });

    test('isSuffix: invalid suffix', () => {
        const word = new BoundaryWord('uuulruuu');
        expect(word.isSuffix('uuul')).toBe(false); // 'uuul' is not a suffix
    });

    test('isAffix: valid affixes', () => {
        const word = new BoundaryWord('uuulruuu');
        expect(word.isAffix('uuu')).toBe(true); // 'uuu' is both prefix and suffix
        expect(word.isAffix('uuul')).toBe(true); // 'uuul' is a prefix (affix)
        expect(word.isAffix('lruuu')).toBe(true); // 'lruuu' is a suffix (affix)
    });

    test('isAffix: invalid affix', () => {
        const word = new BoundaryWord('uuulruuu');
        expect(word.isAffix('lur')).toBe(false); // 'lur' is not an affix
    });

    test('isMiddle: valid middle', () => {
        const word = new BoundaryWord('uuulruuu');
        expect(word.isMiddle('lr')).toBe(true);  // 'lr' is a middle
    });

    test('isMiddle: invalid middle', () => {
        const word = new BoundaryWord('uuulruuu');
        expect(word.isMiddle('uuu')).toBe(false); // 'uuu' is an affix, not a middle
        expect(word.isMiddle('uuul')).toBe(false); // 'uuul' is a prefix, not a middle
    });

    test('findCenter: even-length word', () => {
        const word = new BoundaryWord('uuulruuu');
        expect(word.findCenter()).toBe('lr'); // Center of even-length word is 'lr'
    });

    test('findCenter: odd-length word', () => {
        const word = new BoundaryWord('uuulruu');
        expect(word.findCenter()).toBe('l'); // Center of odd-length word is 'l'
    });

    test('findCenter: single-letter word', () => {
        const word = new BoundaryWord('uuuu');
        expect(word.findCenter()).toBe('uu'); // Center of 'uuuu' is the middle two letters
    });

    test('isPalindrome: valid palindrome (even length)', () => {
        const word = new BoundaryWord('uurrdlldrruu');
        expect(word.isPalindrome()).toBe(true); // uurrdlldrruu reads the same forwards and backwards
    });

    test('isPalindrome: invalid palindrome (even length)', () => {
        const word = new BoundaryWord('uurrduldrruu');
        expect(word.isPalindrome()).toBe(false); // uurrduldrruu does not read the same forwards and backwards
    });

    test('isPalindrome: valid palindrome (odd length)', () => {
        const word = new BoundaryWord('uurrdldrruu');
        expect(word.isPalindrome()).toBe(true); // uurrdldrruu reads the same forwards and backwards
    });

    test('isPalindrome: invalid palindrome (odd length)', () => {
        const word = new BoundaryWord('uurrdulrdrruu');
        expect(word.isPalindrome()).toBe(false); // uurrdulrdrruu does not read the same forwards and backwards
    });

    test('isThetaDrome: valid 90-drome', () => {
        const word = new BoundaryWord('lddr');
        expect(word.isThetaDrome(90)).toBe(true); // uldr splits into ul and dr, where dr = t90+180(ul)
    });

    test('isThetaDrome: invalid 90-drome', () => {
        const word = new BoundaryWord('uldr');
        expect(word.isThetaDrome(90)).toBe(false); // ulul does not satisfy 90-drome
    });

    test('isThetaDrome: valid 180-drome', () => {
        const word = new BoundaryWord('ulul');
        expect(word.isThetaDrome(180)).toBe(true); // ulul splits into ul and ul, ul = t180+180(ul)
    });

    test('isThetaDrome: invalid 180-drome', () => {
        const word = new BoundaryWord('uurd');
        expect(word.isThetaDrome(180)).toBe(false); // uurd splits into uu and rd, rd = t180+180(uu)
    });

    test('isThetaDrome: invalid Θ-drome (odd length)', () => {
        const word = new BoundaryWord('ululu');
        expect(word.isThetaDrome(90)).toBe(false); // ululu has odd length, cannot be a Θ-drome
    });

    test('isThetaDrome: invalid rotation angle', () => {
        const word = new BoundaryWord('ulul');
        expect(() => word.isThetaDrome(45)).toThrow(BoundaryWordError.invalidRotation(45)); // Only multiples of 90 are valid
    });
});