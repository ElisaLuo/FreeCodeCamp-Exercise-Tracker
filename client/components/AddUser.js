import React, {Component} from 'react';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'

import axios from 'axios';
import UserList from './UserList';

class AddUser extends Component{
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state ={
            username: ""
        };
    }

    handleChange(event){
        this.setState({
            username: event.target.value
        });
    }

    addUser = event => {
        event.preventDefault();
        this.setState({
            username: event.target.value
        });

        axios.post('/api/users',{
            username: this.state.username
        }).then(response => {
            console.log(response, 'Username added');
        }).catch(err => {
            console.log(err, 'Username not added');
        });
    };

    render(){
        return (
            <div>
                
                <input
                    onChange={this.handleChange}
                    placeholder="Add User"
                    name="username"
                    value={this.state.username}/>
                <button
                    type={"submit"}
                    onClick={this.addUser}
                    >
                    Submit
                    </button>
                <UserList />
            </div>
          );
    }
}


export default AddUser;
