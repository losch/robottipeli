export const NORTH = 'NORTH';
export const EAST = 'EAST';
export const SOUTH = 'SOUTH';
export const WEST = 'WEST';

export const MAPS = [
  {
    rows: [
      '####E####',
      '#       #',
      '#       #',
      '#       #',
      'E   S   E',
      '#       #',
      '#       #',
      '#       #',
      '#########'
    ],
    initialRobot: {
      x: 4,
      y: 4,
      dir: SOUTH
    }
  },
  {
    rows: [
      '#######E#',
      '#S      #',
      '#########'
    ],
    initialRobot: {
      x: 1,
      y: 1,
      dir: EAST
    }
  },
  {
    rows: [
      '#######E#',
      '#S    # #',
      '###     #',
      '#########'
    ],
    initialRobot: {
      x: 1,
      y: 1,
      dir: EAST
    }
  },
  {
    rows: [
      '##########',
      '#S #     #',
      '## #     #',
      '#        #',
      '#        #',
      '####     #',
      'E        #',
      '##########'
    ],
    initialRobot: {
      x: 1,
      y: 1,
      dir: EAST
    }
  },
  {
    rows: [
      '##########',
      '#S       #',
      '## # # # #',
      '#        #',
      '# # # # ##',
      '#        #',
      '## # # # #',
      '#        E',
      '##########'
    ],
    initialRobot: {
      x: 1,
      y: 1,
      dir: EAST
    }
  },
  {
    rows: [
      '##########',
      '#S#      #',
      '#   ###  #',
      '# #   #  #',
      '# ##  ## #',
      '# #      #',
      '# # #  # #',
      '#   #  # E',
      '##########'
    ],
    initialRobot: {
      x: 1,
      y: 1,
      dir: SOUTH
    }
  }
];
