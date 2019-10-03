import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import TileGrid from './components/TileGrid';

export default function game_init(root, channel) {
  ReactDOM.render(<Memory channel={channel} />, root);
}

class Memory extends React.Component {
  constructor(props) {
    super(props);
    const { channel } = props;
    this.channel = channel;
    this.state = {
      gameState: [],
      clicks: 0,
    };
    this.channel.join()
      .receive("ok", (response) => { 
        console.log('Joined Channel', response);
        this.setState(response.game); 
      })
      .receive("error", response => { console.log('Unable to join', response) });
    this.handleTileClick = this.handleTileClick.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.showTileBeforeHiding = this.showTileBeforeHiding.bind(this);
  }

  // returns the number of open tiles
  getNumberOfOpenTiles() {
    const { gameState } = this.state;
    const openTiles = gameState.filter((tile) => tile.status == 1);
    return openTiles.length;
  }

  // checks if the game has ended
  hasGameEnded() {
    const { gameState } = this.state;
    const gameEnded = gameState.every((tileState) => {
      return tileState.status === -1;
    });
    if (gameEnded) {
      alert('You won! You can play again by clicking on the Restart Game button.');
    }
  }

  // shows the tile at 'position' for 1 second and then hides it
  showTileBeforeHiding() {
    const openTiles = this.getNumberOfOpenTiles();
    if (openTiles == 2) {
      setTimeout(() => {
        this.channel.push("hide", {}).receive("ok", response => {
          this.setState(response.game);
        });
      }, 1000);
    }
    this.hasGameEnded();
  }

  // handles the tile click
  handleTileClick(position) {
    const { gameState } = this.state;
    const openTiles = this.getNumberOfOpenTiles();
    if (openTiles != 2) { // disables clicks when two tiles are open
      this.channel.push("tileClicked", {position: position}).receive("ok", response => {
        this.setState({
          gameState: response.game.gameState,
          clicks: response.game.clicks
        }, this.showTileBeforeHiding);
      });
    }
  }

  // resets the game state to initial game state
  resetGame() {
    this.channel.push("reset", {}).receive("ok", response => {
      this.setState(response.game);
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

