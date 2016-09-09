import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import * as styles from './App.css';

import * as Translations from './translations';
import * as Instructions from './instructions';
import Board from './Board';
import InstructionPipeline from './InstructionPipeline';
import AvailableInstructions from './AvailableInstructions';

class Help extends PureComponent {
  render() {
    return (
      <div className={styles.help}>
        <h2>Ohjeet</h2>
        <div className={styles.helpItemLeft}>
          <div className={styles.helpItem}>
            <Instructions.Instruction
              isUnclickable={true}
              instruction={Instructions.INSTRUCTION_FORWARD} />
            = Liiku eteenpäin
          </div>
          <div className={styles.helpItem}>
            <Instructions.Instruction
              isUnclickable={true}
              instruction={Instructions.INSTRUCTION_BACKWARD} />
            = Liiku taaksepäin
          </div>
        </div>
        <div className={styles.helpItemRight}>
          <div className={styles.helpItem}>
            <Instructions.Instruction
              isUnclickable={true}
              instruction={Instructions.INSTRUCTION_LEFT} />
            = Käänny vasemmalle
          </div>
          <div className={styles.helpItem}>
            <Instructions.Instruction
              isUnclickable={true}
              instruction={Instructions.INSTRUCTION_RIGHT} />
            = Käänny oikealle
          </div>
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    const { language } = this.props;
    return (
      <div className={styles.app}>
        <h1 className={styles.header}>{
          Translations.text(Translations.HEADER_TITLE, language)
        }</h1>
        <Board />
        <div className={styles.controlPanel}>
          <AvailableInstructions />
          <div className={styles.controlPanelSeparator} />
          <InstructionPipeline />
          <div className={styles.controlPanelSeparator} />
          <Help />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.language
  };
}

export default connect(mapStateToProps)(App);
