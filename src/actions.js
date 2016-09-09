export const RESET = 'RESET';
export const NEXT_MAP = 'NEXT_MAP';
export const PUSH_INSTRUCTION = 'PUSH_INSTRUCTION';
export const REMOVE_INSTRUCTION = 'REMOVE_INSTRUCTION';
export const SWITCH_LANGUAGE = 'SWITCH_LANGUAGE';
export const PLAY_TRIGGERED = 'PLAY_TRIGGERED';
export const STOP_TRIGGERED = 'STOP_TRIGGERED';
export const STEP_TRIGGERED = 'STEP_TRIGGERED';

/*
 * Reset the game
 */
export function reset() {
  return {
    type: RESET
  };
}

/*
 * Select next map
 */
export function nextMap() {
  return {
    type: NEXT_MAP
  };
}

/*
 * Game configuration actions
 */

export function switchLanguage(language) {
  return {
    type: SWITCH_LANGUAGE,
    payload: language
  };
}

/*
 * Instruction pipeline
 */

export function pushInstruction(instruction) {
  return {
    type: PUSH_INSTRUCTION,
    payload: instruction
  };
}

export function removeInstruction(index) {
  return {
    type: REMOVE_INSTRUCTION,
    payload: index
  };
}

/*
 * Play actions
 */

export function play() {
  return {
    type: PLAY_TRIGGERED
  };
}

export function stop() {
  return {
    type: STOP_TRIGGERED
  };
}

export function stepGameState(instruction) {
  return {
    type: STEP_TRIGGERED,
    payload: instruction
  };
}
