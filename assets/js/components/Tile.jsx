import React from 'react';
import ReactDOM from 'react-dom';

export default class Tile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { tile: { letter, position, status } } = this.props;
        const visibleTile = (
            <div className="visible-tile">
                <span className="tile-text">
                    {letter}
                </span>
            </div>
        );
        const hiddenTile = (
            <div className="hidden-tile" onClick={() => {
                this.props.handleTileClick(position);
            }} />
        );
        const disabledTile = (
            <div className="disabled-tile">
                <span className="tile-text">
                    {letter}
                </span>
            </div>
        );
        const tile = status > 0 ? visibleTile : (status == 0 ? hiddenTile : disabledTile);
        return tile;
    }
}

