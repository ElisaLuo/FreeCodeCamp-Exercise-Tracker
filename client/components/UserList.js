import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class UserList extends Component{
    constructor(props){
        super(props);

        this.state ={
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

    render(){
        const {usernames} = this.state;
        return (
            <div>
               {usernames.map(username => <Link to={`/user/${username.username}`}>{username.username}<br/></Link>)}
            </div>     
        );
    }
}

// 
export default UserList;