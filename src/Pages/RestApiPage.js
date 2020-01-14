import React,{Component} from 'react'

import '../App.css';
import AppMenu from "../components/AppMenu";

export default class RestApiPage extends Component {

    constructor(props){
        super(props)
    }
    render() {
        return(
            <div>
                <AppMenu/>
                RestApiPage
            </div>
        )
    }
}
