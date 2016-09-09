import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as styles from './App.css';

import * as Translations from './translations';
import Board from './Board';
import InstructionPipeline from './InstructionPipeline';
import AvailableInstructions from './AvailableInstructions';

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
