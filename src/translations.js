export const FI = 'FI';
export const EN = 'EN';

export const HEADER_TITLE = 'HEADER_TITLE';
export const INSTRUCTION_PIPELINE_TITLE = 'INSTRUCTION_PIPELINE_TITLE';
export const AVAILABLE_INSTRUCTIONS_TITLE = 'AVAILABLE_INSTRUCTIONS_TITLE';
export const BOARD_ROBOT_WON = 'BOARD_ROBOT_WON';
export const BOARD_REPLAY = 'BOARD_REPLAY';
export const BOARD_PLAY_NEXT_MAP = 'BOARD_PLAY_NEXT_MAP';

const fi = {
  'HEADER_TITLE': 'Robottipeli',
  'INSTRUCTION_PIPELINE_TITLE': 'Komentojono',
  'AVAILABLE_INSTRUCTIONS_TITLE': 'Komennot',
  'BOARD_ROBOT_WON': 'Voitit!',
  'BOARD_REPLAY': 'Pelaa uudestaan',
  'BOARD_PLAY_NEXT_MAP': 'Pelaa seuraava kartta'
};

const en = {
  'HEADER_TITLE': 'The Robot Game',
  'INSTRUCTION_PIPELINE_TITLE': 'Instruction pipeline',
  'AVAILABLE_INSTRUCTIONS_TITLE': 'Instructions',
  'BOARD_ROBOT_WON': 'You win!',
  'BOARD_REPLAY': 'Play again',
  'BOARD_PLAY_NEXT_MAP': 'Next level'
};

export function text(key, language) {
  if (language === 'FI') {
    return fi[key];
  }
  else if (language === 'EN') {
    return en[key];
  }
  else {
    console.error('Unknown language:', language);
  }
}
