import React, { Component } from 'react';
import firebase from './../Firebase.js';
import Button from '@material-ui/core/Button';
import { SingleMessage } from './';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Cookies from 'universal-cookie';


var secret = require("./../secret.json");


var moment = require('moment');//  18/03/2019 13:35:42 PM



const cookies = new Cookies();

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
    .then(function () {  return (messaging.getToken()) })
    .then(function (token) {  })
    .catch(function (err) {  });
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
            reciever_list: [],
            sent_sender: 'server',
            sent_reciever: '',
            sent_message: '',
            recieved_sender: '',
            recieved_reciever: '',
            recieved_message: '',
            recipients: [],
        };
        this.messageRef = firebase.database().ref().child('messages');
        this.vehicleRef = firebase.database().ref().child('vehicles');
        // var newItem1 = {
        //     companyID: '1',
        //     vehicle: '02-MH-4247'
        // }
        // var newItem2 = {
        //     companyID: '1',
        //     vehicle: '07-CL-5357'
        // }
        // var newItem3 = {
        //     companyID: '1',
        //     vehicle: '13-HH-4845'
        // }
        // var newItem4 = {
        //     companyID: '1',
        //     vehicle: '18-LK-5425'
        // }
        // var newItem5 = {
        //     companyID: '1',
        //     vehicle: '06-CC-2342'
        // }
        // var newItem6 = {
        //     companyID: '1',
        //     vehicle: '18-GH-5235'
        // }
        // var newItem7 = {
        //     companyID: '1',
        //     vehicle: '01-UR-2522'
        // }
        // firebase.database().ref().child('vehicles').push(newItem1);
        // firebase.database().ref().child('vehicles').push(newItem2);
        // firebase.database().ref().child('vehicles').push(newItem3);
        // firebase.database().ref().child('vehicles').push(newItem4);
        // firebase.database().ref().child('vehicles').push(newItem5);
        // firebase.database().ref().child('vehicles').push(newItem6);
        // firebase.database().ref().child('vehicles').push(newItem7);

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.oneRecipientClick = this.oneRecipientClick.bind(this);


    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.setState({
                sent_sender: nextProps.user.displayName,
                recieved_reciever: nextProps.user.displayName
            });
        }
    }
    componentWillMount() {
        // this.listenMessages();

    }

    componentDidMount() {
        var reciepients_holder = [];

        
        // Getting the list of possible conversations
        if (this.state && this.state != undefined) {
            var this_self = this;

            
            var cID = cookies.get('cID');
            this.vehicleRef.orderByChild('companyID').equalTo(cID).on("value", function (snapshot) {
                snapshot.forEach(function (data) {
                    //if (!reciepients_holder.includes(data.val()['sender'])) {
                        reciepients_holder.push(data.val()['vehicle']);
                    //}
                });
                this_self.setState({
                    recipients: reciepients_holder
                });
                if(reciepients_holder.length > 0) this_self.oneRecipientClick( reciepients_holder[0]);
            });

            // this.messageRef.orderByChild('reciever').equalTo('server').on("value", function (snapshot) {
            //     snapshot.forEach(function (data) {
            //         if (!reciepients_holder.includes(data.val()['sender'])) {
            //             reciepients_holder.push(data.val()['sender']);
            //         }
            //     });
            //     this_self.setState({
            //         recipients: reciepients_holder
            //     });
            //     if(reciepients_holder.length > 0) this_self.oneRecipientClick( reciepients_holder[0]);
            // });
            
        }
    }

    handleChange(event) {
        this.setState({ sent_message: event.target.value });
    }
    handleSend() {
        if (this.state.sent_message) {
            var current = moment();
            var formatted_current = current.format('DD/MM/YYYY hh:mm:ss A');
            console.log(current.isBefore(moment("22/03/2019 03:23:32 PM")));
            console.log(current.isAfter(moment("22/03/2019 03:23:32 PM")));
            var newItem = {
                sender: this.state.sent_sender,
                reciever: this.state.sent_reciever,
                message: this.state.sent_message,
                conversation: this.state.sent_sender + " " + this.state.sent_reciever,
                timestamp: formatted_current
            }
            this.messageRef.push(newItem);
            this.setState({ sent_message: '' });
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
                if (message.exists()) {
                    this.setState({
                        reciever_list: Object.values(message.val()),
                    });
                }
            });
        // this.messageRef.orderByChild('sender').equalTo(this.state.recieved_sender).on('value', message => {
        //     if (message.exists()) {
        //         this.setState({
        //             list: Object.values(message.val()),
        //         });
        //     }
        // });
    }
    oneRecipientClick(str){
        this.setState({
            recieved_sender: str,
            sent_reciever : str,
            reciever_list: []
        });
        console.log(str);
        this.messageRef.orderByChild('conversation').equalTo("server "+str).on("value", message => {
            if (message.exists()) {
                this.setState({
                    reciever_list: Object.values(message.val()),
                });
            }
        });

        
    }
    render() {
        return (
            <div>
                <div class="container">
                    <div className="row">
                        <div className="col-3 chat">
                            <Paper className="paper_inline paper_scroll">
                                <Typography variant="h5"> Conversations</Typography>
                                <Divider/>
                                {this.state.recipients.map((item, index) =>
                                    <div>
                                        <div className="oneRecipient" data-id={item} onClick={() => { this.oneRecipientClick(item) }} key={index} >{item} </div>
                                        <Divider />
                                    </div>
                                )}
                            </Paper>
                        </div>
                        <div className="col-9 chat">
                            <Paper className="paper_inline chat_paper">
                                <div className="form">
                                    <div className="form__message">
                                        {this.state.reciever_list.map((item, index) =>
                                            <SingleMessage key={index} message={item} />
                                        )}
                                    </div>
                                    <div className="form__row">
                                        <input
                                            className="form__input"
                                            type="text"
                                            placeholder="Type message"
                                            value={this.state.sent_message}
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
                                            Send
                        </Button>
                                    </div>
                                </div>
                            </Paper>
                        </div>
                    </div></div>
            </div>
        );
    }
}
export default Messaging;

