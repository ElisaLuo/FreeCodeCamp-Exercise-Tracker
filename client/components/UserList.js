import React, {Component} from 'react';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Input, List, Button } from 'semantic-ui-react';

class UserList extends Component{
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state ={
            username: "",
            usernames: []
        };
    }

    componentDidMount() {
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
    const {usernames} = this.state;
    return (
        <div>
            <div>
                <List inverted link divided relaxed>
                    <Input inverted placeholder="Add User" 
                        value={this.state.username} 
                        onChange={this.handleChange}
                        style={{width: "100%"}}
                        icon={<Button type={"submit"} inverted onClick={this.addUser} icon="add circle"></Button>}/>
                    {usernames.map(username => <List.Item as="a">
                    <Link to={`/user/${username.username}`}>
                        <List.Content>
                            <List.Icon inverted color="grey" name="user" size="large" />
                                {username.username}
                        </List.Content>
                        </Link>
                    </List.Item>
                    
                    )}
                </List>
                </div> 
            </div>
          );
    }
}


export default UserList;
