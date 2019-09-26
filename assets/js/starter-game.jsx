import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import TileGrid from './components/TileGrid';

export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}

// Fisher–Yates Shuffle
// Reference: https://stackoverflow.com/a/6274381
// shuffles an array
function shuffle(letters) {
  for (let i = letters.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters;
}

// the letters used for the grid
const availableLetters = [
  'A', 'A', 'B', 'B',
  'C', 'C', 'D', 'D',
  'E', 'E', 'F', 'F',
  'G', 'G', 'H', 'H',
];

/* Game state consists of clicks and an array of objects, where each object is:
*  {
*     letter // the letter for the tile
*     position // the position of the letter in the tile grid
*     status // state of tile; 0: hidden, 1: shown, -1: disabled
*  }
*/
class Starter extends React.Component {
  constructor(props) {
    super(props);
    const gameState = shuffle(availableLetters).map((letter, index) => {
      return {
        'letter': letter,
        'position': index,
        'status': 0,
      };
    })
    this.state = { clicks: 0, gameState };
    this.handleTileClick = this.handleTileClick.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  // returns an array of all the open tiles
  getOpenTiles() {
    const { gameState } = this.state;
    let openTiles = [];
    gameState.forEach((state) => {
      if (state.status == 1) {
        openTiles.push(state);
      }
    });
    return openTiles;
  }

  // returns the Tile State of tile at 'position'
  getTileAtPosition(position) {
    const { gameState } = this.state;
    let tile = null;
    gameState.forEach((tileState) => {
      if (tileState.position == position) {
        tile = tileState;
      }
    });
    return tile;
  }

  // sets the status of all the tile positions in 'positions' to 'newStatus'
  setTileStatus(positions, newStatus) {
    const { gameState } = this.state;
    const newGameState = gameState.map((tileState) => {
      const { letter, position } = tileState;
      if (positions.includes(position)) {
        return {
          letter,
          position,
          'status': newStatus,
        };
      }
      return tileState;
    });
    return newGameState;
  }

  // shows the tile at 'position' for 1 second and then hides it
  showTileBeforeHiding(position) {
    const newGameState = this.setTileStatus([position], 1);
    this.setState({
      gameState: newGameState,
    });
  }

  // checks if the game has ended
  hasGameEnded() {
    const { gameState } = this.state;
    const gameEnded = gameState.every((tileState) => {
      return tileState.status === -1;
    });
    if (gameEnded) {
      alert('Game has ended!');
    }
  }

  // handles the tile click
  // TODO: add check for game end
  handleTileClick(position) {
    const { gameState, clicks } = this.state;
    const openTiles = this.getOpenTiles();
    const numOpenTiles = openTiles.length;
    let newGameState = gameState;
    // if there are no tiles that are shown;
    // show the clicked tile
    if (numOpenTiles == 0) {
      newGameState = this.setTileStatus([position], 1);
      this.setState({
        gameState: newGameState,
        clicks: clicks + 1,
      });
    } else if (numOpenTiles == 1) { // if there is one tile that's open, this tile is a guess
      const openedTile = openTiles[0];
      const currentTile = this.getTileAtPosition(position);
      if (openedTile.letter == currentTile.letter) { // if the letter matches
        newGameState = this.setTileStatus([openedTile.position, currentTile.position], -1);
        this.setState({
          gameState: newGameState,
          clicks: clicks + 1,
        });
      } else { // if the letter doesn't match
        this.showTileBeforeHiding(currentTile.position);
        setTimeout(() => {
          newGameState = this.setTileStatus([openedTile.position, currentTile.position], 0);
          this.setState({
            gameState: newGameState,
            clicks: clicks + 1,
          });
        }, 1000);
      }
    }
  }

  // resets the game state to initial game state
  resetGame() {
    const gameState = shuffle(availableLetters).map((letter, index) => {
      return {
        'letter': letter,
        'position': index,
        'status': 0,
      };
    })
    this.setState({
      gameState,
      clicks: 0,
    });
  }

  render() {
    const header = (
      <div style={{ textAlign: 'center' }}>
        <h1> Memory Game </h1>
        <hr />
      </div>
    );
    const { clicks } = this.state;

    return (
      <div>
        {header}
        <TileGrid gameState={this.state.gameState} handleTileClick={this.handleTileClick} />
        <br />
        <b title="less is better!">
          Score / Number of Clicks: <span className="purple-text">{clicks}</span>
        </b>
        <button style={{ float: 'right' }} onClick={this.resetGame}>Restart Game</button>
      </div>
    );
  }
}

