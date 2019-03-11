import React, { Component } from 'react';

export default class SingleMessage extends Component {
    render() {
        return (
            <div className="singleMessage">
                <span className="message__author">
                    {this.props.message.numberPlate}:
                </span>
                <span className="speech-bubble-left">
                    {this.props.message.message}
                </span>
            </div>
        )
    }
}