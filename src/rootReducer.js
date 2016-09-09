import { assign } from 'lodash';
import { combineReducers } from 'redux';
import * as Instructions from './instructions';
import * as Actions from './actions';
import * as Maps from './maps';

const initialInstructions = [];

/**
 * Robot's instruction pipeline
 */

function instructionPipeline(state = initialInstructions, action) {
  switch (action.type) {
    case Actions.RESET:
    case Actions.NEXT_MAP:
      return [];

    case Actions.PUSH_INSTRUCTION:
      return [...state, action.payload];

    case Actions.REMOVE_INSTRUCTION:
      let nextState = state.slice(0);
      nextState.splice(action.payload, 1);
      return nextState;

    default:
      return state;
  }
}

/**
 * Game board's state
 */

function selectMap(mapNumber) {
  const map = Maps.MAPS[mapNumber];
  return {
    rows: map.rows,
    initialRobot: assign({}, map.initialRobot, { hasRobotWon: false }),
    robot: assign({}, map.initialRobot, { hasRobotWon: false }),
    currentMap: mapNumber
  };
}

const initialBoard = selectMap(0);

function turn(dir, toRight) {
  if (toRight) {
    switch (dir) {
      case Maps.NORTH: return Maps.EAST;
      case Maps.EAST:  return Maps.SOUTH;
      case Maps.SOUTH: return Maps.WEST;
      case Maps.WEST:  return Maps.NORTH;
      default:         return dir;
    }
  }
  else {
    switch (dir) {
      case Maps.NORTH: return Maps.WEST;
      case Maps.EAST:  return Maps.NORTH;
      case Maps.SOUTH: return Maps.EAST;
      case Maps.WEST:  return Maps.SOUTH;
      default:         return dir;
    }
  }
}

function turnRobot(robot, toRight) {
  return assign({}, robot, {dir: turn(robot.dir, toRight)});
}

function canMove(rows, x, y) {
  let row = rows[y] || [];
  let cell = row[x];
  return cell !== '#';
}

function hasWon(rows, x, y) {
  return y <= 0 ||
         x <= 0 ||
         y >= rows.length - 1 ||
         x >= rows[0].length - 1;
}

function moveRobot(rows, robot, step) {
  let nextX;
  let nextY;

  switch (robot.dir) {
    case Maps.NORTH:
      nextX = robot.x;
      nextY = robot.y - step;
      break;

    case Maps.EAST:
      nextX = robot.x + step;
      nextY = robot.y;
      break;

    case Maps.SOUTH:
      nextX = robot.x;
      nextY = robot.y + step;
      break;

    case Maps.WEST:
      nextX = robot.x - step;
      nextY = robot.y;
      break;

    default:
      nextX = robot.x;
      nextY = robot.y;
  }

  if (canMove(rows, nextX, nextY)) {
    if (hasWon(rows, nextX, nextY)) {
      return assign({}, robot, {x: nextX, y: nextY, hasRobotWon: true});
    }
    return assign({}, robot, {x: nextX, y: nextY});
  }
  else {
    return robot;
  }
}

function board(state = initialBoard, action) {
  if (action.type === Actions.STEP_TRIGGERED) {
    switch (action.payload) {
      case Instructions.INSTRUCTION_LEFT:
        return assign(
          {},
          state,
          { robot: turnRobot(state.robot, false) }
        );

      case Instructions.INSTRUCTION_RIGHT:
        return assign(
          {},
          state,
          { robot: turnRobot(state.robot, true) }
        );

      case Instructions.INSTRUCTION_FORWARD:
        return assign(
          {},
          state,
          { robot: moveRobot(state.rows, state.robot, 1) }
        );

      case Instructions.INSTRUCTION_BACKWARD:
        return assign(
          {},
          state,
          { robot: moveRobot(state.rows, state.robot, -1) }
        );

      default:
        return state;
    }
  }
  else {
    switch (action.type) {
      case Actions.RESET:
        return assign(
          {},
          state,
          { robot: state.initialRobot }
        );

      case Actions.NEXT_MAP:
        let nextMap = state.currentMap + 1;
        if (nextMap >= Maps.MAPS.length) {
          nextMap = 0;
        }
        return assign({}, state, selectMap(nextMap));

      case Actions.PLAY_TRIGGERED:
        return assign(
          {},
          state,
          { robot: state.initialRobot }
        );

      default:
        return state;
    }
  }
}

/**
 * Game state
 */

function gameState(state = { isPlaying: false, atInstruction: 0 }, action) {
  switch (action.type) {
    case Actions.RESET:
    case Actions.NEXT_MAP:
      return {
        isPlaying: false,
        atInstruction: 0
      };

    case Actions.PLAY_TRIGGERED:
      return {
        isPlaying: true,
        atInstruction: 0
      };

    case Actions.STOP_TRIGGERED:
      return {
        isPlaying: false,
        atInstruction: 0
      };

    case Actions.STEP_TRIGGERED:
      return {
        isPlaying: state.isPlaying,
        atInstruction: state.atInstruction + 1
      };

    default:
      return state;
  }
}

/**
 * Language selection
 */

function language(state = 'FI', action) {
  switch (action.type) {
    case Actions.SWITCH_LANGUAGE:
      return action.payload;

    default:
      return state;
  }
}

/**
 * Combination of all reducers
 */

const rootReducer = combineReducers({
  board: board,
  instructionPipeline: instructionPipeline,
  gameState: gameState,
  language: language
});

export default rootReducer;
