import React from 'react';
import ReactDOM from 'react-dom';
import Tile from './Tile';

export default class TileGrid extends React.Component {
    render() {
        const tileGrid = (
            <div className="grid">
                <Tile letter='A'/>
                <Tile letter='A'/>
                <Tile letter='A'/>
                <Tile letter='A'/>
                <div className="grid-line-break" />
                <Tile letter='A'/>
                <Tile letter='A'/>
                <Tile letter='A'/>
                <Tile letter='A'/>
                <div className="grid-line-break" />
                <Tile letter='A'/>
                <Tile letter='A'/>
                <Tile letter='A'/>
                <Tile letter='A'/>
                <div className="grid-line-break" />
                <Tile letter='A'/>
                <Tile letter='A'/>
                <Tile letter='A'/>
                <Tile letter='A'/>
            </div>
        );
        
        return tileGrid;
    }
}

