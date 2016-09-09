import React from 'react';
import * as styles from './instructions.css';

export const INSTRUCTION_LEFT = 'INSTRUCTION_LEFT';
export const INSTRUCTION_RIGHT = 'INSTRUCTION_RIGHT';
export const INSTRUCTION_FORWARD = 'INSTRUCTION_FORWARD';
export const INSTRUCTION_BACKWARD = 'INSTRUCTION_BACKWARD';

export const AVAILABLE_INSTRUCTIONS = [
  INSTRUCTION_LEFT,
  INSTRUCTION_RIGHT,
  INSTRUCTION_FORWARD,
  INSTRUCTION_BACKWARD
];

function createInstructionElement(instruction, isActive, isClickable) {
  switch (instruction) {
    case INSTRUCTION_LEFT:
      return (
        <button className={isActive ? styles.leftActive :
                                      isClickable ? styles.left :
                                                    styles.leftUnclickable }>
          &#x21B0;
        </button>
      );

    case INSTRUCTION_RIGHT:
      return (
        <button className={isActive ? styles.rightActive :
                                      isClickable ? styles.right :
                                                    styles.leftUnclickable }>
          &#x21B1;
        </button>
      );

    case INSTRUCTION_FORWARD:
      return (
        <button className={isActive ? styles.forwardActive :
                                      isClickable ? styles.forward :
                                                    styles.forwardUnclickable }>
          &uarr;
        </button>
      );

    case INSTRUCTION_BACKWARD:
      return (
        <button className={isActive ? styles.backwardActive :
                                      isClickable ? styles.backward :
                                                    styles.backwardUnclickable }>
          &darr;
        </button>
      );

    default:
      console.error('Unknown instruction', instruction);
      return (
        <button className={isActive ? styles.unknownActive : styles.unknown}>
          ?
        </button>
      );
  }
}

export class Instruction extends React.Component {
  render() {
    const { instruction, onClick, isActive, isUnclickable } = this.props;
    return React.cloneElement(createInstructionElement(instruction,
                                                       isActive,
                                                       !isUnclickable),
                              {onClick: onClick});
  }
}
