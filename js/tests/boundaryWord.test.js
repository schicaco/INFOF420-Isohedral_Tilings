import BoundaryWord from '../modules/BoundaryWord';

describe('BoundaryWord Class', () => {
    test('Constructor: valid word', () => {
        const word = new BoundaryWord('ldru');
        expect(word.getWord()).toBe('ldru');
    });

    test('Constructor: invalid word (empty string)', () => {
        expect(() => new BoundaryWord('')).toThrow('Invalid word: A string of at least 4 letters is required.');
    });

    test('Constructor: invalid word (too short)', () => {
        expect(() => new BoundaryWord('ldr')).toThrow('Invalid word: A string of at least 4 letters is required.');
    });

    test('Constructor: invalid word (non-string)', () => {
        // @ts-expect-error: Testing with a non-string input
        expect(() => new BoundaryWord(123)).toThrow('Invalid word: A string of at least 4 letters is required.');
    });

    test('Constructor: invalid word (invalid letters)', () => {
        expect(() => new BoundaryWord('ldrx')).toThrow('Invalid word: All letters must be in the alphabet.');
    });

    test('getLetter: valid index', () => {
        const word = new BoundaryWord('ldru');
        expect(word.getLetter(0)).toBe('l');
        expect(word.getLetter(3)).toBe('u');
    });

    test('getLetter: invalid index (negative)', () => {
        const word = new BoundaryWord('ldru');
        expect(() => word.getLetter(-1)).toThrow('Index -1 is out of bounds.');
    });

    test('getLetter: invalid index (out of range)', () => {
        const word = new BoundaryWord('ldru');
        expect(() => word.getLetter(4)).toThrow('Index 4 is out of bounds.');
    });

    test('rotateLetter: valid rotations', () => {
        expect(BoundaryWord.rotateLetter('u', 90)).toBe('l');
        expect(BoundaryWord.rotateLetter('d', 180)).toBe('u');
        expect(BoundaryWord.rotateLetter('r', 270)).toBe('d');
    });

    test('rotateLetter: invalid rotation angle', () => {
        expect(() => BoundaryWord.rotateLetter('u', 45)).toThrow('Invalid rotation angle 45 or letter u.');
    });

    test('complementLetter: valid complement', () => {
        expect(BoundaryWord.complementLetter('u')).toBe('d');
        expect(BoundaryWord.complementLetter('l')).toBe('r');
    });

    test('rotateWord: valid rotation', () => {
        const word = new BoundaryWord('uldr');
        expect(word.rotateWord(90)).toBe('ldru');
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
        const rotated = word.rotateWord(90); // 'ldru'
        expect(rotated).toBe('ldru');
    });

    test('getFactor: valid factor', () => {
        const word = new BoundaryWord('uuulruuu');
        expect(word.getFactor(1, 3)).toBe('uuu'); // Factor from index 1 to 3
        expect(word.getFactor(4, 6)).toBe('lru'); // Factor from index 4 to 6
    });

    test('getFactor: invalid indices', () => {
        const word = new BoundaryWord('uuulruuu');
        expect(() => word.getFactor(0, 3)).toThrow('Invalid indices: i = 0, j = 3.');
        expect(() => word.getFactor(4, 10)).toThrow('Invalid indices: i = 4, j = 10.');
        expect(() => word.getFactor(6, 5)).toThrow('Invalid indices: i = 6, j = 5.');
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
});