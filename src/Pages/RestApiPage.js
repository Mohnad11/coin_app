import React,{Component} from 'react'

import '../App.css';
import AppMenu from "../components/AppMenu";
import axios from 'axios'
export default class RestApiPage extends Component {

    constructor(props){
        super(props)
        this.state={data:[]}
    }
    componentDidMount() {
        this.getDataFromRestApi();
    }
    getDataFromRestApi(){
        axios.get("https://jsonplaceholder.typicode.com/albums")
            .then(res => {
                const data = res.data;
                this.setState({data:data.slice(0,10)})
            })
    }
    getData(){
        let data=this.state.data;
        let items=[];
        data.forEach(x=>{
            items.push( <tr>
                            <td>{x.id}</td>
                            <td>{x.userId}</td>
                            <td>{x.title}</td>
                        </tr>
            );
        })
        return (items);
    }
    render() {
        return(
            <div>
                <AppMenu page={2}/>
                <div style={{marginTop:70}}>
                    <table style={{width:'30%',margin:'auto'}}>
                        <tr>
                            <th>id</th>
                            <th>user id</th>
                            <th>title</th>
                        </tr>
                        {this.getData()}
                    </table>
                </div>
            </div>
        )
    }
}
