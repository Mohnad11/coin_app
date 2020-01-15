import React,{Component} from 'react'
import '../App.css';
import AppMenu from "../components/AppMenu";
let W3CWebSocket = require('websocket').w3cwebsocket;
export default class WebSocketPage extends Component {

    constructor(props){
        super(props)
        this.state={data:[],start:true,client:null}
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.currencyDiv.scrollIntoView({ behavior: "smooth" });
        if(this.currencyDiv!=null){
            this.currencyDiv.scroll(this.currencyDiv.scrollWidth,0)
        }
    }
    componentDidMount() {
        let client = new W3CWebSocket('wss://ws.bitstamp.net');
        this.setState({client:client},()=>this.connectToTheSocket())

    }
    subscribeChannel(){
        if(this.state.client==null)
            return;
        const obj={
            "event": "bts:subscribe",
            "data": {
                "channel": "order_book_btcusd"
            }
        }
        this.state.client.send(JSON.stringify(obj));
    }
    unSubscribeChannel(){
        if(this.state.client==null)
            return;
        const obj={
            "event": "bts:unsubscribe",
            "data": {
                "channel": "order_book_btcusd"
            }
        }
        this.state.client.send(JSON.stringify(obj));
    }
    connectToTheSocket(){
        if(this.state.client==null)
            return;
        this.state.client.onopen = this.onSocketOpen.bind(this);
        this.state.client.onmessage = this.onMessageReceive.bind(this);
    }
    onSocketOpen(){
        console.log('WebSocket Client Connected');
        this.subscribeChannel();
    }
    onMessageReceive(e){
        let json=JSON.parse(e.data);
        let bids=json.data.bids;
        let asks=json.data.asks;
        if(asks!=null && bids!=null && asks.length>0 && bids.length>0){
            let ask=parseFloat(asks[0][0]);
            let bid=parseFloat(bids[0][0]);
            let res=(ask+bid)/2;
            let data=this.state.data;
            if(data[data.length-1]!=res){
                data.push(res);
            }
            this.setState({data:data})

        }
    }

    GetData(){
        let items=[]
        let data=this.state.data;
        for(let i=0;i<data.length;i++){
            if(i==0) {
                items.push(<p style={{display:'inline-block'}}>{data[i].toFixed(4)}&nbsp;</p>);
            }
            if(data[i]<=data[i-1]){
                items.push(<p style={{color:'red',display:'inline-block'}}>{data[i].toFixed(4)}&nbsp;</p>);
            }
            if(data[i]>data[i-1]){
                items.push(<p style={{color:'green',display:'inline-block'}}>{data[i].toFixed(4)}&nbsp;</p>);
            }
        }


        return ( items);
    }
    startStop(){
        this.setState({start:!this.state.start}, ()=>{
            if(this.state.start==false){
                alert("stopped")
                this.unSubscribeChannel();
            }
            else
            {
                alert("started")
                this.subscribeChannel();
            }
        })
    }
    render() {
        return(
            <div>
                <AppMenu page={1}/>


                <div ref={(ref) => this.currencyDiv = ref}  style={{width:'60%',overflowX:'auto',border:"solid",borderWidth:1,height:50,margin:'auto',whiteSpace: 'nowrap',marginTop:70}}>
                    {this.GetData()}
                </div>

                <button onClick={()=>this.startStop()} style={{marginTop:30,paddingLeft:10,paddingRight:10,paddingTop:5,paddingBottom:5}}>START/STOP</button>


            </div>
        )
    }
}
