import React, {Component} from "react";
import Axios from "axios";
import User from "./User";
import "../../assets /scss/components/users.css";

export default class Users extends Component{
    state = {
        users: [],
    }
    componentDidMount() {
        this.getUsers();
    }
    getUsers = async () => {
        await Axios.get("https://randomuser.me/api/?results=20", {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        }).then(responce => {
            console.log(responce.data.results);
            this.setState({
                users: responce.data.results
            })
        })
    }
    renderUser(arr){
        return arr.map(item => {
            const {gender, email, dob, name, location, id, picture} = item;
            return(
                <User
                    key = {id.value}
                    gender={gender}
                    email = {email}
                    age = {dob.age}
                    firstName = {name.first}
                    lastName = {name.last}
                    country = {location.country}
                    _id = {id.value}
                    picture = {picture}
                />
            )
        })
    }

    render(){
        const {users} = this.state;
        let result = this.renderUser(users);
        return(
            <div className="users">
                {result}
            </div>
        )
    }
}