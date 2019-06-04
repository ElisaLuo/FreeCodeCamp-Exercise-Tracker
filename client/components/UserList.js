import React, {Component} from 'react';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import nFetch from './Utils';
import axios from 'axios';

class UserList extends Component{
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
            </div>
          );
    }

    
}


export default UserList;
