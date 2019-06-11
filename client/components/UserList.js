import React, {Component} from 'react';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'

import axios from 'axios';

class UserList extends Component{
    constructor(props){
        super(props);

        this.state ={
            usernames: []
        };
    }

    componentDidUpdate() {
        fetch('/api/users')
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    usernames: result
                });
                }
            )
    }
    
    componentDidUpdate() {
        fetch('/api/users')
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    usernames: result
                });
                }
            )
    }

    render(){
        const {usernames} = this.state;
        return (
            <div>
                {usernames.map(username => <div>{username.username}</div>)}
            </div>     
        );
    }
}


export default UserList;
