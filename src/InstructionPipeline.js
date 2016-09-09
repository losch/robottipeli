import React from 'react';
import { connect } from 'react-redux';
import * as Translations from './translations';
import * as Instructions from './instructions';
import * as Actions from './actions';
import * as styles from './InstructionPipeline.css'

const GAME_TICK = 500; // ms

class InstructionPipeline extends React.Component {
  removeInstruction(index) {
    this.props.dispatch(Actions.removeInstruction(index));
  }

  play() {
    if (!this.props.gameState.isPlaying) {
      this.props.dispatch(Actions.play());

      if (!this.ticker) {
        this.ticker = setInterval(this.tick.bind(this), GAME_TICK);
      }
    }
  }

  isInstructionActive(i) {
    const { gameState } = this.props;
    return gameState.isPlaying && gameState.atInstruction === i;
  }

  tick() {
    const { gameState, instructionPipeline } = this.props;
    if (gameState.isPlaying) {
      let currentInstruction = gameState.atInstruction;
      if (currentInstruction < instructionPipeline.length) {
        this.props.dispatch(
          Actions.stepGameState(instructionPipeline[currentInstruction])
        );
      }
      else {
        this.props.dispatch(Actions.stop());

        clearInterval(this.ticker);
        this.ticker = null;
      }
    }
  }

  render() {
    const { language, instructionPipeline, gameState } = this.props;

    return (
      <div className={styles.instructionPipeline}>
        <h2>{Translations.text(Translations.INSTRUCTION_PIPELINE_TITLE,
                               language)}</h2>
        <div className={styles.instructions}>
          <button
            className={styles.playButton}
            disabled={gameState.isPlaying ? 'disabled' : ''}
            onClick={this.play.bind(this)}>Play</button>
          {
            instructionPipeline.map((instruction, i) =>
              <div className={styles.instruction}>
                <Instructions.Instruction
                  key={'instruction-' + i}
                  isActive={this.isInstructionActive(i)}
                  instruction={instruction}
                  onClick={e => this.removeInstruction(i)} />
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.language,
    instructionPipeline: state.instructionPipeline,
    gameState: state.gameState
  };
}

export default connect(mapStateToProps)(InstructionPipeline);
