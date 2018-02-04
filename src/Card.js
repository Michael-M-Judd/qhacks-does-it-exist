import React, { Component } from 'react';

class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color: '',
            ratingMessage: ''}
        ;
    }

    componentWillMount() {
        // Calculate rating and message
        let realColor = '';
        let message = '';
        let rating = this.props.rating;

        if ( rating >= 0.75 ) {
            realColor = 'red';
            message = 'Very similar idea';
        }
        else if ( rating < 0.75 && rating >= 0.5 ) {
            realColor = 'yellow';
            console.log('It should be yellow');
            message = 'Similar idea';
        }
        else {
            realColor = 'green';
            message = 'Different idea';
        }
        this.setState({
            color: realColor,
            ratingMessage: message
        });
    }

    render() {

        return (
        <div className="card">
            <div className="logo">
                <img src={this.props.image_url} alt=""/>
            </div>
            <div className="details">
                <h3 className="title">{this.props.name}
                    <span className="location">
                        Available on {this.props.location}
                    </span>
                </h3>
            
                <p>{this.props.tagline}</p>
                <div className="tags">
                    <p>{this.props.tags}</p>
                </div>
            </div>
            <div className="right-align">
                <div className="rating">
                    <div className={ this.state.color }>
                        {this.props.rating.toFixed(2)}
                        <span>{this.state.ratingMessage}</span>
                    </div>
                </div>
            </div>
            <div className="link">
                <a href={this.props.url}>VIEW APP</a>
            </div>
        </div>
        );
    }
    }

export default Card;
