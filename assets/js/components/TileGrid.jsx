import React from 'react';
import ReactDOM from 'react-dom';
import Tile from './Tile';

export default class TileGrid extends React.Component {
    renderTileGrid() {
        const { gameState, handleTileClick } = this.props;
        let tileGrid = [];
        let insertBreak = 3;
        gameState.forEach((state, index) => {
            tileGrid.push(<Tile key={index} tile={state} handleTileClick={handleTileClick} />);
            if (index == insertBreak) {
                tileGrid.push(<div key={`break-at-${insertBreak}`} className="grid-line-break" />);
                insertBreak += 4;
            }
        });
        return tileGrid;
    }

    render() {
        return (
            <div className="grid">
                {this.renderTileGrid()}
            </div>
        );
    }
}

