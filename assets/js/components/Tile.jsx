import React from 'react';
import ReactDOM from 'react-dom';

export default class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showLetter: false };
        this.showLetter = this.showLetter.bind(this);
    }

    showLetter() {
        this.setState({
            showLetter: !this.state.showLetter,
        });
    }

    render() {
        const visibleCard = (
            <div className="visible-card">
                <span className="card-text">
                    {this.props.letter}
                </span>
            </div>
        );
        const hiddenCard = (
            <div className="hidden-card" onClick={this.showLetter}/>
        );
        const card = this.state.showLetter ? visibleCard : hiddenCard;
        return card;
    }
}

