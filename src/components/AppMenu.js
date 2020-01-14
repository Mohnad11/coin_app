import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class AppMenu extends Component {

    constructor(props){
        super(props)
    }
    render() {
        return(
            <div>

                <Link to='/'>web socket</Link>
                <Link to='/api'>rest api</Link>
            </div>
        )
    }
}
