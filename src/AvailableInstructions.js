import React from 'react';
import { connect } from 'react-redux';
import * as Translations from './translations';
import * as Instructions from './instructions';
import * as Actions from './actions';

class AvailableInstructions extends React.Component {
  pushInstruction(instruction) {
    this.props.dispatch(Actions.pushInstruction(instruction));
  }

  render() {
    const { language } = this.props;
    return (
      <div>
        <h2>{Translations.text(Translations.AVAILABLE_INSTRUCTIONS_TITLE,
                               language)}</h2>
        {
          Instructions.AVAILABLE_INSTRUCTIONS.map((instruction, i) =>
            <Instructions.Instruction
              key={'instruction-' + i}
              instruction={instruction}
              onClick={e => this.pushInstruction(instruction)} />
          )
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.language
  };
}

export default connect(mapStateToProps)(AvailableInstructions);
