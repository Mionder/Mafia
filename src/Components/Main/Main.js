import React, {Component} from "react";
import Users from "./Users";
import "../../assets /scss/pages/main.css";
export default class Main extends Component{
    render(){
        return(
            <div className="main">
                <div className="_container">
                    <div className="main-wrapper">
                        <Users />
                    </div>
                </div>
            </div>
        )
    }
}