import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class AppMenu extends Component {

    constructor(props){
        super(props)
        this.state={page:props.page}
    }

    render() {
        return(
            <div >
                <div id={'appMenuDiv'}>
                    <div className={this.state.page==1?'menuItem selectedMenuItem':'menuItem'}>
                        <Link to='/' style={{fontSize:20}} class={'menuLinkButton'}>web socket</Link>
                    </div>
                    <div style={{width:'1px',backgroundColor:'black',display:'inline-block',height:25,verticalAlign:'middle'}}/>
                    <div  className={this.state.page==2?'menuItem selectedMenuItem':'menuItem'}>
                        <Link to='/api' style={{fontSize:20}} class={'menuLinkButton'}>rest api</Link>
                    </div>


                </div>

            </div>
        )
    }
}
//className={this.state.page==1?' selectedMenuItem':''}
