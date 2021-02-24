import React, {Component} from "react";
// import "../../assets /scss/components/user.css";
export default class User extends Component{
    render(){
        const {firstName} = this.props;
        return(
            <div className="user-wrapper">
                <div className="image">
                </div>
                <div className="info">
                    <p className="name">{firstName}</p>
                </div>
            </div>
        )
    }
}