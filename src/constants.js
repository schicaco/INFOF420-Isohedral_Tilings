const DIRECTION = {
    UP: 'u',
    DOWN: 'd',
    LEFT: 'l',
    RIGHT: 'r'
};

const ROTATION = {
    [DIRECTION.UP]: {
        0: DIRECTION.UP,
        90: DIRECTION.LEFT,
        180: DIRECTION.DOWN,
        270: DIRECTION.RIGHT,
    },
    [DIRECTION.DOWN]: {
        0: DIRECTION.DOWN,
        90: DIRECTION.RIGHT,
        180: DIRECTION.UP,
        270: DIRECTION.LEFT,
    },
    [DIRECTION.LEFT]: {
        0: DIRECTION.LEFT,
        90: DIRECTION.DOWN,
        180: DIRECTION.RIGHT,
        270: DIRECTION.UP,
    },
    [DIRECTION.RIGHT]: {
        0: DIRECTION.RIGHT,
        90: DIRECTION.UP,
        180: DIRECTION.LEFT,
        270: DIRECTION.DOWN,
    },
};

export { DIRECTION, ROTATION };