import React,{Component} from 'react'

import '../App.css';
import AppMenu from "../components/AppMenu";
import { client as W3CWebSocket } from "websocket";
var WebSocketClient = require('websocket').client;

export default class WebSocketPage extends Component {

    constructor(props){
        super(props)

    }
    getFromSocket(){
        var client = new WebSocketClient();
        client.connect('wss://ws.bitstamp.net', 'echo-protocol');
        client.on('connect', function(connection) {

            console.log('WebSocket Client Connected');
        });
        client.on('data', function(msg) {
            console.log(msg)
        });
        //const socket = openSocket("wss://ws.bitstamp.net",{transports: ['websocket'],upgrade: true});
        //socket.set('origins', 'http://yourdomain.com:80');
        //socket.on("connection", data => console.log(data));
        //order_book_btcusd
    }
    componentDidMount() {
        this.getFromSocket();
    }
    handleData(data){
        console.log(data);
    }
    render() {
        return(
            <div>
                <AppMenu/>
                WebSocketPage

            </div>
        )
    }
}
