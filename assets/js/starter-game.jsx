import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import TileGrid from './components/TileGrid';

export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}

class Starter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { left: false };
  }

  render() {
    const header = (
      <div style={{ textAlign:'center' }}>
        <h1> Memory Game </h1>
        <hr />
      </div>
    );

    return (
      <div>
        {header}
        <TileGrid size={8}/>
        <br />
        <b> Score: </b>
        <button style={{float: 'right'}}>Restart Game</button>
      </div>
    );
  }
}

