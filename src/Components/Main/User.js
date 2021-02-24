import React, {Component} from "react";
import "../../assets /scss/components/user.css";
import {Link} from "react-router-dom";
export default class User extends Component{
    render(){
        const {firstName, age, picture, _id} = this.props;
        return(
            <Link to={`/user/${_id}`} className="user-wrapper">
                <div className="image">
                    <img src={picture.large} alt="no-pic"/>
                </div>
                <div className="info">
                    <p className="name">{firstName}</p>
                    <p className="age">{age} years old</p>
                </div>
            </Link>
        )
    }
}