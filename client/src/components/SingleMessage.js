import React, { Component } from 'react';

export default class SingleMessage extends Component {
    render() {
        return (

            <div className="singleMessageRow">
                {this.props.message.sender !== "server" ?
                    <div className="singleMessage">
                        <span className="message__author">
                            {this.props.message.sender}
                        </span>
                        <span className="speech-bubble-left">
                            {this.props.message.message}
                        </span>
                    </div>
                    :
                    <div className="singleMessage-right">
                        <span className="message__author">
                            {this.props.message.sender}
                        </span>
                        <span className="speech-bubble-right">
                            {this.props.message.message}
                        </span>
                    </div>
                }

            </div>
        )
    }
}