import React, { Component } from 'react';
import firebase from './../Firebase.js';
import Button from '@material-ui/core/Button';
import { SingleMessage } from './';
import Paper from '@material-ui/core/Paper';

var secret = require("./../secret.json");

var config = {
    apiKey: secret.firebase_apiKey,
    authDomain: secret.authDomain,
    databaseURL: secret.databaseURL,
    storageBucket: secret.storageBucket,
    messagingSenderId: secret.messagingSenderId
};

firebase.initializeApp(config);
const messaging = firebase.messaging();
messaging.requestPermission()
    .then(function () { console.log("Have Permission"); return (messaging.getToken()) })
    .then(function (token) { console.log(token) })
    .catch(function (err) { console.log("error: " + err) });
// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.onMessage(function (payload) {
    console.log('Message received. ', payload.notification.body);

});

class Messaging extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberPlate: 'Sebastian',
            message: '',
            list: [],
        };
        this.messageRef = firebase.database().ref().child('messages');
        this.listenMessages();
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSend = this.handleSend.bind(this);
        
        
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.setState({ 'numberPlate': nextProps.user.displayName });
        }
    }

    handleChange(event) {
        this.setState({ message: event.target.value });
    }
    handleSend() {
        if (this.state.message) {
            var newItem = {
                numberPlate: this.state.numberPlate,
                message: this.state.message,
            }
            this.messageRef.push(newItem);
            this.setState({ message: '' });
        }
    }
    handleKeyPress(event) {
        if (event.key !== 'Enter') return;
        this.handleSend();
    }
    listenMessages() {
        this.messageRef
            .limitToLast(10)
            .on('value', message => {
                this.setState({
                    list: Object.values(message.val()),
                });
            });
    }


    render() {
        return (
            <Paper className="paper">
                <div className="form">
                    <div className="form__message">
                        {this.state.list.map((item, index) =>
                            <SingleMessage key={index} message={item} />
                        )}
                    </div>
                    <div className="form__row">
                        <input
                            className="form__input"
                            type="text"
                            placeholder="Type message"
                            value={this.state.message}
                            onChange={this.handleChange}
                            onKeyPress={this.handleKeyPress}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="form__button"
                            onClick={this.handleSend}
                        >
                            Sign in
                        </Button>
                    </div>
                </div>
            </Paper>
        );
    }
}
export default Messaging;

