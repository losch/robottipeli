import React from 'react';
import {connect} from 'react-redux';
import * as Translations from './translations';
import * as Actions from './actions';
import { NORTH, EAST, SOUTH, WEST } from './maps';
import * as styles from './Board.css';

/*
class Status extends React.Component {
  render() {
    const { board, gameState } = this.props;

    return (
      <div className={styles.status}>
        <span className={styles.statusText}><b>MEM:</b> 65,536 bytes</span>
        <span className={styles.statusText}><b>X:</b> {board.robot.x}</span>
        <span className={styles.statusText}><b>Y:</b> {board.robot.y}</span>
        <span className={styles.statusText}><b>DIR:</b> {board.robot.dir}</span>
        <span className={styles.statusText}><b>ENGINE:</b> {gameState.isPlaying ? 'ON' : 'OFF'}</span>
      </div>
    );
  }
}
*/

class Board extends React.Component {
  renderCell(cell, x, y) {
    const { robot } = this.props.board;
    let key = `cell-${x}-${y}`;

    if (robot.x === x && robot.y === y) {
      let robotKey = `robot-${x}-${y}`;
      switch (robot.dir) {
        case NORTH:
          return <div key={robotKey} className={styles.cellRobot}>&uarr;</div>;

        case EAST:
          return <div key={robotKey} className={styles.cellRobot}>&rarr;</div>;

        case SOUTH:
          return <div key={robotKey} className={styles.cellRobot}>&darr;</div>;

        default:
          console.error('Unknown robot orientation', robot.dir);
          // fallthrough
        case WEST:
          return <div key={robotKey} className={styles.cellRobot}>&larr;</div>;
      }
    }

    switch (cell) {
      case '#':
        return <div key={key} className={styles.cellWall}>&nbsp;</div>;

      case 'E':
        return <div key={key} className={styles.cellExit}>EXIT</div>;

      default:
        return <div key={key} className={styles.cellFloor}>&nbsp;</div>
    }
  }

  renderRow(row, y) {
    let key = `row-${y}`;
    return (
      <div key={key} className={styles.row}>{
        row.split('').map((cell, x) => this.renderCell(cell, x, y))
      }</div>
    );
  }

  reset() {
    this.props.dispatch(Actions.nextMap());
  }

  render() {
    const { board, language } = this.props;
    return (
      <div className={styles.board}>
        {
          board.robot.hasRobotWon ?
            <div className={styles.winMessage}>
              <div className={styles.winMessageBackprop} />
              <div className={styles.winMessageText}>
                <div>
                  { Translations.text(Translations.BOARD_ROBOT_WON, language) }
                </div>

                <button className={styles.playAgainButton}
                        onClick={this.reset.bind(this)}>{
                  Translations.text(Translations.BOARD_PLAY_NEXT_MAP, language)
                }</button>
              </div>
            </div> :
            null
        }
        { board.rows.map((row, y) => this.renderRow(row, y)) }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.board,
    gameState: state.gameState,
    language: state.language
  };
}

export default connect(mapStateToProps)(Board);
